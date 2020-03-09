from job_process_file import ProcessFile
from status_enum import JobStatus
from job_db import DbConnect
import threading
import datetime

class Job(threading.Thread): 
    global error_message

    def __init__(self, jobId): 
        self.jobId = jobId
        self.status = JobStatus.pending
        self.created_on = datetime.datetime.now()
        self._stop = threading.Event() 
        self.failed = False
        threading.Thread.__init__(self)

        DbConnect.insert_new(self.jobId, self.status, self.created_on)

    # function using _stop function 
    def stop(self): 
        self._stop.set() 
  
    def stopped(self): 
        return self._stop.isSet() 
  
    def run(self): 
        DbConnect.update_status(self.jobId, JobStatus.running)
        x = ProcessFile(self.jobId)
        x.start()
        x.join(timeout = 120)
        x.stop_thread()
        finished_on = datetime.datetime.now()

        if (x.is_alive()):
            self.failed = True
            error_message = "Timeout Error"
        elif (x.Result == None):
            self.failed = True
            error_message = "No Results Returned"
        # else if (exception error):
        #     failed = True
        #     error_message = "Exception"

        if (self.failed == True):
            DbConnect.job_complete(self.jobId, JobStatus.fail, finished_on, error=error_message)
            return

        movie_id = x.Result
        DbConnect.job_complete(self.jobId, JobStatus.success, finished_on, movie_id=movie_id)
        # print("Calling web controller to return results:\n{}".format(result))
