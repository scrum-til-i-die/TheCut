# This program will take a video input and extract frames
import cv2
from localProcess import localProcess

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


if __name__ == "__main__":
    # Call function
    SplitVideo("../videos/inception.mov")
    localProcess('../images/frame-200.jpg')

# import os
# os.system("gsutil cp ./poop.png gs://the-cut-test-bucket")