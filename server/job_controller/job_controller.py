from flask import Flask, request
from flask_restful import Resource, Api
from job import Job
from job_db import DbConnect

app = Flask(__name__)
api = Api(app)

# class JobController(Resource):
#     def post(self):
#         return {"message": "Hello"}

# api.add_resource(JobController, '/')

@app.route('/create-job', methods=['POST'])
def create_job():
    jobId = request.args.get('jobId')

    x = Job(jobId)
    x.start()

    return {
        "job_id": x.jobId,
        "status": x.status,
        "created_on": x.created_on
        }

@app.route('/get-job', methods=['GET'])
def get_job():
    jobId = request.args.get('jobId')

    job = DbConnect.get_job(jobId)

    job_id = jobId
    status = job[1]
    movie_id = job[2]
    error = job[3]
    created_on = job[4]
    finished_on = job[5]

    result = {
        "job_id": job_id,
        "status": status,
        "movie_id": movie_id,
        "error": error,
        "created_on": created_on,
        "finished_on": finished_on
    }
        
    return result

if __name__ == "__main__":
    app.run(debug=True, port=5001, host='0.0.0.0')
