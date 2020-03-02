import json
import requests
import os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('PUBLIC_KEY')
import urllib.parse

# API_KEY = os.environ.get("PUBLIC_KEY")
print(API_KEY)

base_url = "https://api.themoviedb.org/3"

def get_metadata(movie_name):
    
    id = get_movie_id(movie_name)
    # metadata_object = get_movie_info(id)
    print(id)

def get_movie_id(movie_name):
    params = {
        "api_key": API_KEY,
        "query": urllib.parse.quote(movie_name)
    }
    return requests.get(base_url+'/search/movie', params)


get_metadata("Inception")