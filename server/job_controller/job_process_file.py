import time
import threading
# from video_process import *
# from audio_Process import *

class ProcessFile(threading.Thread):   
    def __init__(self, jobId): 
        self.Result = None
        self.jobId = jobId
        self._stopper = threading.Event() 
        threading.Thread.__init__(self)
  
    def has_timeout(self):
        print ("Error: Thread has exceeded timeout limit... terminating")
        return

    # function using _stop function 
    def stop_thread(self): 
        self._stopper.set() 
  
    def stopped(self): 
        return self._stopper.is_set() 
    
    def process_video(self):
        return "Processing video {}".format(self.jobId)

        # SplitVideo(f"~/app/uploads/{jobId}/{jobId}.mp4")
        # uploadImg()
        # output = singleProcess() # right now it processes 6 images
    
    def process_audio(self):
        return "Processing audio {}".format(self.jobId)
        
        # transcibedArray = TranscribeAudio("../videos/InceptionCut.mp4")
        # print (transcibedArray)
        # for sentence in transcibedArray:
        #     print ("Transcribed: {}".format(sentence))
  
    def analyze_results(self):
        # combine results / format
        videoResults = self.process_audio()
        audioResult = self.process_video()
        return "Movie Identified"

    def run(self): 
        result = self.analyze_results()

        if self.stopped():
            self.has_timeout()
            return

        self.Result = result
        return