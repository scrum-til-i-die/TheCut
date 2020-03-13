from flask import Flask, request
from flask_restful import Resource, Api
from job import Job
from job_db import DbConnect

app = Flask(__name__)
api = Api(app)

@app.route('/create-job', methods=['POST'])
def create_job():
    job_id = request.args.get('jobId')

    jobIds = DbConnect.get_all_jobid()

    if any(job_id in jobId for jobId in jobIds):
        result = DbConnect.get_job(job_id)
    else:
        x = Job(job_id)
        x.start()
        result = {
            "job_id": x.jobId,
            "status": x.status,
            "created_on": x.created_on
        }

    return result

@app.route('/job', methods=['GET'])
def get_job():
    jobId = request.args.get('jobId')

    result = DbConnect.get_job(jobId)
    if (result == None):
        return {
            "job_id": jobId,
            "status": "Not Found"
        }

    return result

if __name__ == "__main__":
    app.run(debug=True, port=5001, host='0.0.0.0')
