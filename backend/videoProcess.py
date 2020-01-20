# This module will take a video input and extract frames

import cv2, os
import shutil
from google.cloud import vision_v1
from collections import defaultdict

def SplitVideo(video_path):

    # Video
    video = cv2.VideoCapture(video_path)

    # Used to count number of frames
    frame_count = 0

    # Used to check if fram extraction worked
    success = True

    while success:
        # Read from teh video object
        success, image = video.read()

        # Save the frame with frame count every 20 frames
        if frame_count % 200 == 0:
            cv2.imwrite("images/frame-%d.jpg" % frame_count, image)

        # increment frame_count
        frame_count += 1
    print ("...video splitted into images")

# def zipImg():
#     shutil.make_archive('imageZip', 'zip', '../images')
#     return

# def unzipImg():
#     shutil.unpack_archive('imageZip.zip', extract_dir='../images')
#     return

def uploadImg():
    # os.system("gsutil cp ./imageZip.zip gs://the-cut-test-bucket")
    for file in os.listdir("images/"):
        os.system(f"gsutil cp images/{file} gs://the-cut-test-bucket")
    print ("...images uploaded")

def singleProcess():
    dict = defaultdict(lambda: 0)
    client = vision_v1.ImageAnnotatorClient()

    imagePaths = [
        'gs://the-cut-test-bucket/frame-0.jpg',
        'gs://the-cut-test-bucket/frame-200.jpg',
        'gs://the-cut-test-bucket/frame-400.jpg',
        'gs://the-cut-test-bucket/frame-600.jpg',
        'gs://the-cut-test-bucket/frame-800.jpg',
        'gs://the-cut-test-bucket/frame-1000.jpg'
    ]

    for i in range(5):
        response = client.annotate_image(
            {
                'image': {'source': {'image_uri': imagePaths[i]}},
                'features': [{'type': vision_v1.enums.Feature.Type.WEB_DETECTION}]
            }
        )

        output = response.web_detection.web_entities
        for d in output:
            if d.description:
                dict[d.description] += 1

    print ("Top 10 result", sorted(dict, key=dict.get, reverse=True)[:10])