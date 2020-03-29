import requests
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('PUBLIC_KEY')

base_url = "https://api.themoviedb.org/3"

# Get movie id, returns -1 if movie does not exist
def get_movie_id(movie_name):
    params = {
        "api_key": API_KEY,
        "query": movie_name
    }
    data = requests.get(base_url+'/search/movie', params).json()
    # Check if movie is actually a movie
    return -1 if not data["results"] else data["results"][0]["id"]

# Get movie metadata from id
def get_metadata(movie_id):
    params = {
        "api_key": API_KEY,
    }
    full_metadata = requests.get(base_url+'/movie/'+str(movie_id), params).json()

    separator = ', '
    movie_metadata = {
        'movie_id': full_metadata['id'],
        'title': full_metadata['original_title'],
        'poster_path': full_metadata['poster_path'],
        'genres': separator.join([genre['name'] for genre in full_metadata['genres']]),
        'overview': full_metadata['overview'],
        'actors': separator.join(['']),
        'runtime': full_metadata['runtime']
    }

    return movie_metadata
