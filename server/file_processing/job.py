from ProcessFile import ProcessFile
import threading

class Job(threading.Thread): 
    def __init__(self, jobId): 
        self.jobId = jobId
        self._stop = threading.Event() 
        threading.Thread.__init__(self)
  
    # function using _stop function 
    def stop(self): 
        self._stop.set() 
  
    def stopped(self): 
        return self._stop.isSet() 
  
    def run(self): 
        x = ProcessFile(self.jobId)
        x.start()
        x.join(timeout = 3)
        x.stop()

        if (x.is_alive):
            print ("Updating job entry to timeout error...")
            return
        
        result = x.Result
        print(result)
        
