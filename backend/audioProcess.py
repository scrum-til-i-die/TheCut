# This module extracts audio from a video file and process its speech
import sys, os, io, re

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


#Imports the MoviePy client library
from moviepy.editor import *

# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types



def ExtractAudio(video_path):
    outputPath = "../audio/Inception_Audio.mp3"
    video = VideoFileClip(video_path)
    # video = VideoFileClip("../videos/InceptionCut.mp4")
    audio = video.audio
    audio.write_audiofile(outputPath) #TODO: try to find quiet execution of this command
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

    # print('Transcript: {}'.format(response.results[0].alternatives[0].transcript))
    

def TranscribeAudio(video_path):
    audio_path = ExtractAudio(video_path)
    transcribed_audio = GoogleTranscribe(audio_path)
    transcribed_sentences = re.split('; |\? |\.', transcribed_audio)
    return transcribed_senteces

def IdentifyMovie(quote11):
    driver = webdriver.Chrome()
    driver.get("http://www.quodb.com/search/" + quote)
    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "title"))
        )

        soup = BeautifulSoup(driver.page_source)
    finally:
        driver.quit()

    soup_movies = soup.find_all("small", class_="title")
    string_movies = [str(movie) for movie in soup_movies]

    regex = lambda x : re.search("\>(.*?)\<", x).group(1)
    movies = [regex(movie) for movie in string_movies]
    return movies

