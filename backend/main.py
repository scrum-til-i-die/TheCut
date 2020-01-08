from videoProcess import *
# from audioProcess import *

if __name__ == "__main__":
    # Video Extraction
    SplitVideo("../videos/inception.mov")
    zipImg()
    uploadImg()
    singleProcess() # right now it processes 5 images
    
    # Audio Extraction
    # transcibedArray = TranscribeAudio("../videos/InceptionCut.mp4")
    # print (transcibedArray)

    # for sentence in transcibedArray:
    #     print ("Transcribed: {}".format(sentence))
