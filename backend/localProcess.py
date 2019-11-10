import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

def localProcess(imagePath):
    # Instantiates a client
    client = vision.ImageAnnotatorClient()

    # The name of the image file to annotate
    file_name = os.path.abspath(imagePath)

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    image = types.Image(content=content)

    # Performs label detection on the image file
    response = client.web_detection(image=image)
    D = response.web_detection.web_entities

    # print (D)
    print('Web detections:')
    for d in D:
        if d.description:
            print (d.description)
    
    return D

# localProcess('./poopTest.png')