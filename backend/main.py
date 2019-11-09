# This program will take a video input and extract frames
import cv2

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

        # Save the frame with frame count
        cv2.imwrite("../images/frame-%d.jpg" % frame_count, image)

        # increment frame_count
        frame_count += 1


if __name__ == "__main__":
    # Call function
    SplitVideo("../videos/big_buck_bunny.mp4")