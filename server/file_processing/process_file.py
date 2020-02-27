# # from video_process import *
# # from audio_Process import *

# def processVideo(jobId):
#     # # Video Extraction
#     # SplitVideo(f"~/app/uploads/{jobId}/{jobId}.mp4")
#     # uploadImg()
#     # output = singleProcess() # right now it processes 6 images

#     # Audio Extraction
#     # transcibedArray = TranscribeAudio("../videos/InceptionCut.mp4")
#     # print (transcibedArray)
#     # for sentence in transcibedArray:
#     #     print ("Transcribed: {}".format(sentence))

#     print "Processing job {}".format(jobId)


import time
import threading

class ProcessFile(threading.Thread):   
    def __init__(self, jobId): 
        self.jobId = jobId
        self._stop = threading.Event() 
        threading.Thread.__init__(self)
  
    def has_timeout(self):
        print ("Error: Thread has exceeded timeout limit... terminating")
        return

    # function using _stop function 
    def stop(self): 
        self._stop.set() 
  
    def stopped(self): 
        return self._stop.isSet() 
    
    def process_video(self):
        print "Processing video {}".format(self.jobId)
    
    def process_audio(self):
        print "Processing audio {}".format(self.jobId)
  
    def run(self): 
        self.process_audio()
        time.sleep(2)
        self.process_video()
        time.sleep(4)

        if self.stopped():
            self.has_timeout()
            return

        Result = "Movie Identified"
        return
        
