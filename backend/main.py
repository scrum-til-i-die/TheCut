from videoProcess import *
from audioProcess import *

if __name__ == "__main__":
    # Video Extraction
    # SplitVideo("../videos/inception.mov")
    # uploadImg()
    # singleProcess('gs://the-cut-test-bucket/frame-0.jpg')
    
    # Audio Extraction
    transcibedArray = TranscribeAudio("../videos/InceptionCut.mp4")
    print (transcibedArray)

    # for sentence in transcibedArray:
    #     print ("Transcribed: {}".format(sentence))
