# This module extracts audio from a video file and process its speech
import sys, os, io, re

#Imports the MoviePy client library
from moviepy.editor import *

# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types


# Set up Google Custom Search for identifying movies
from dotenv import load_dotenv
import requests
import collections

load_dotenv()
API_KEY = os.getenv('CUSTOM_SEARCH_API_KEY')
CSE_ID = os.getenv('CUSTOM_SEARCH_ID')

base_url = "https://www.googleapis.com/customsearch/v1"

def ExtractAudio(video_path):
    outputPath = video_path[:-1]+"3"
    video = VideoFileClip(video_path)
    audio = video.audio
    audio.write_audiofile(outputPath)
    return outputPath

def GoogleTranscribe(audio_path):
    # Instantiates a client
    client = speech.SpeechClient()

    # The name of the audio file to transcribe
    file_name = os.path.abspath(audio_path)

    # Loads the audio into memory
    with io.open(file_name, 'rb') as audio_file:
        content = audio_file.read()
        audio = types.RecognitionAudio(content=content)

    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz=16000,
        language_code='en-US',
        model='video',
        enable_automatic_punctuation=True,
        )

    # Detects speech in the audio file
    response = client.recognize(config, audio)

    return response.results[0].alternatives[0].transcript

def TranscribeAudio(job_id):
    video_path = '/app/uploads/{}/{}.mp4'.format(job_id, job_id)
    print (video_path)
    audio_path = ExtractAudio(video_path)
    transcribed_audio = GoogleTranscribe(audio_path)
    transcribed_sentences = re.split('; |\? |\.', transcribed_audio)
    return transcribed_sentences

def IdentifyMovie(quote):
    params = {
        "cx": CSE_ID,
        "key": API_KEY,
        "q": quote,
    }
    
    data = requests.get(base_url, params).json()
    regex = lambda x : re.search("^(.*) \(.*?$", x).group(1)
    return -1 if "items" not in data else regex(data["items"][0]["title"])

# returns dictionary of
# { MovieName: Percentage of Results matching }
def CountMovies(quotes):
    movieCount = collections.defaultdict(int)
    num = len(quotes)
    movieResults = map(IdentifyMovie, quotes)
    for movie in movieResults: movieCount[movie] += 1/num

    return movieCount
