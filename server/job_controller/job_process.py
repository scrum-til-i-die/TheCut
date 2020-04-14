import time
import threading
from api_services.video_process import *
from api_services.audio_process import *
from metadata import *
from job_db import DbConnect

class ProcessFile(threading.Thread):   
    def __init__(self, jobId):
        self.Result = None
        self.jobId = jobId
        self.audioResult = dict()
        self.videoResult = dict()
        self.failureReason = ""
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
        VRS = {get_movie_id(k): v for k, v in VideoProcess(self.jobId).items() if k}
        length = len(VRS.keys())

        if (VRS == None):
            self.failureReason = self.failureReason + "No video results; "
            return

        self.videoResult = {k: v/length for k, v in sorted(VRS.items(), key=lambda item: (item[1]), reverse=True) if k != -1}
        return
    
    def process_audio(self):
        ARS = {get_movie_id(k): v for k, v in AudioProcess(self.jobId).items() if k}
        length = len(ARS.keys())

        if (ARS == None):
            self.failureReason = self.failureReason + "No audio results; "

        self.audioResult = {k: v/length for k, v in sorted(ARS.items(), key=lambda item: (item[1]), reverse=True) if k != -1}
        return
  
    def analyze_results(self):
        # Prune out non-movie titles from video_results dictionary?
        
        results = dict()
        resultId = None
        
        inter = self.audioResult.keys() & self.videoResult.keys()
        if ((not len(self.audioResult)) and len(self.videoResult)):
            resultId = next(iter(self.videoResult))
        elif ((not len(self.videoResult)) and len(self.audioResult)):
            resultId = next(iter(self.audioResult))
        elif (len(inter) == 0):
            audioTop = next(iter(self.audioResult))
            videoTop = next(iter(self.videoResult))
            audioTopResult = self.audioResult[audioTop]
            videoTopResult = self.videoResult[videoTop]

            if (audioTopResult > videoTopResult):
                resultId = audioTop
            else:
                resultId = videoTop
        else:
            for title in inter:
                results[title] = (self.videoResult[title] + self.audioResult[title])/2

            results = {k: v for k, v in sorted(results.items(), key=lambda item: (item[1]), reverse=True)}
            resultId = next(iter(results))
        
        print(resultId)
        if not resultId: return

        if (str(resultId) in DbConnect.get_all_moviemetadata_id()):
            metadata = DbConnect.get_moviemetadata(resultId)
        else:
            metadata = get_metadata(resultId)
            DbConnect.create_moviemetadata_fromobj(metadata)
        
        return resultId

    def run(self): 
        audioThread = threading.Thread(target=self.process_audio)
        videoThread = threading.Thread(target=self.process_video)
        
        audioThread.start()
        videoThread.start()

        audioThread.join()
        videoThread.join()

        if (self.failureReason != ""):
            return
        
        result = self.analyze_results()

        if self.stopped():
            self.has_timeout()
            return

        self.Result = result
        return
