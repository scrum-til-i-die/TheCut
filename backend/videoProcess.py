# This module will take a video input and extract frames

import cv2, os
from singleProcess import singleProcess

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
        if frame_count % 20 == 0:
            cv2.imwrite("../images/frame-%d.jpg" % frame_count, image)

        # increment frame_count
        frame_count += 1
    print ("...video splitted into images")


def uploadImg():
    # os.system("gsutil cp ../images/frame-0.jpg gs://the-cut-test-bucket")
    for file in os.listdir("../images/"):
        os.system(f"gsutil cp ../images/{file} gs://the-cut-test-bucket")
    print ("...images uploaded")