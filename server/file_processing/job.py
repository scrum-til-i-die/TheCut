from job_process_file import ProcessFile
from status_enum import JobStatus
from job_db import DbConnect
import threading
import datetime

class Job(threading.Thread): 
    def __init__(self, jobId): 
        self.jobId = jobId
        self.status = JobStatus.pending
        self.datetime = datetime.datetime.now()
        self._stop = threading.Event() 
        threading.Thread.__init__(self)

        DbConnect.insert_new(self.jobId, self.status, self.datetime)

    # function using _stop function 
    def stop(self): 
        self._stop.set() 
  
    def stopped(self): 
        return self._stop.isSet() 
  
    def run(self): 
        DbConnect.update_status(self.jobId, self.status)
        x = ProcessFile(self.jobId)
        x.start()
        x.join(timeout = 120)
        x.stop()

        if (x.is_alive):
            # print ("Updating job entry to timeout error...")
            return
        
        result = x.Result
        print("Calling web controller to return results:\n{}".format(result))
