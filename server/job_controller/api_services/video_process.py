# This module will take a video input and extract frames
import cv2, os, io
from google.cloud import vision_v1
from google.cloud.vision import types
from collections import defaultdict

def SplitVideo(job_id):
    # Base Path for job
    job_path = "/app/uploads/" + job_id

    # Video
    video = cv2.VideoCapture(job_path+"/" + job_id + ".mp4")

    # Used to count number of frames
    frame_count = 0

    # create images directory
    os.mkdir(f"{job_path}/images")

    # Used to check if frame extraction worked
    success = True
    while success:
        # Read from the video object
        success, image = video.read()

        # Save the frame with frame count every 20 frames
        if frame_count % 200 == 0:
            cv2.imwrite(f"{job_path}/images/frame-{frame_count}.jpg", image)

        # increment frame_count
        frame_count += 1

# def zipImg():
#     shutil.make_archive('imageZip', 'zip', '../images')
#     return

# def unzipImg():
#     shutil.unpack_archive('imageZip.zip', extract_dir='../images')
#     return

def AnnotateFrames(job_id):
    # Base Path for job
    job_path = "/app/uploads/" + job_id

    resultsDict = defaultdict(lambda: 0)

    client = vision_v1.ImageAnnotatorClient()

    for file in os.listdir(f"{job_path}/images/")[:5]:

        file_name = f"{job_path}/images/{file}"

        # open file and read contents
        with io.open(file_name, 'rb') as image_file:
            content = image_file.read()
        
        # save contents to a google image object
        image = types.Image(content = content)

        # perform web detection
        response = client.annotate_image(
            {
                'image': image,
                'features': [{
                    'type': vision_v1.enums.Feature.Type.WEB_DETECTION,
                }]
            }
        )

        # throw result in dictionary
        output = response.web_detection.web_entities
        for d in output:
            if d.description:
                resultsDict[d.description] += 1
    
    # compute percentages and order
    return {k: v for k, v in sorted(resultsDict.items(), key=lambda item: (item[1]), reverse=True)}

# Wrapper to run all methods
def VideoProcess(job_id):
    SplitVideo(job_id)
    return AnnotateFrames(job_id)