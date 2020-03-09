from flask import Flask, request
from flask_restful import Resource, Api
from job import Job

app = Flask(__name__)
api = Api(app)

# class JobController(Resource):
#     def post(self):
#         return {"message": "Hello"}

# api.add_resource(JobController, '/')

@app.route('/run-job', methods=['GET'])
def run_job():
    jobId = request.args.get('jobId')

    x = Job(jobId)
    x.start()

    return {
        "job_id": x.jobId,
        "status": x.status,
        "created_on": x.created_on
        }

if __name__ == "__main__":
    app.run(debug=True, port=5001, host='0.0.0.0')
