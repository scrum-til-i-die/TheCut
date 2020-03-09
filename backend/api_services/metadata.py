import requests
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('PUBLIC_KEY')

base_url = "https://api.themoviedb.org/3"

# Returns metadata of movie given title
def get_metadata(movie_name):
    response = get_movie_id(movie_name)
    movie = response.json()["results"][0]
    return get_metadata_from_id(movie["id"])

# Helper function to get movie id
def get_movie_id(movie_name):
    params = {
        "api_key": API_KEY,
        "query": movie_name
    }
    return requests.get(base_url+'/search/movie', params)

# Helper function to get movie metadata
def get_metadata_from_id(movie_id):
    params = {
        "api_key": API_KEY,
    }
    return requests.get(base_url+'/movie/'+str(movie_id), params)


print(get_metadata("inception").json())