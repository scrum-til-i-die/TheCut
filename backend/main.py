from videoProcess import *

if __name__ == "__main__":
    # Call function
    SplitVideo("../videos/inception.mov")
    uploadImg()
    singleProcess('gs://the-cut-test-bucket/frame-0.jpg')
