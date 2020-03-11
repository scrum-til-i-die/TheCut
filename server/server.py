from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class server(Resource):
    def get(self):
        return {'about': 'poop 1212'}

class uploadImage(Resource):
    def post(self):
      return

api.add_resource(server, '/')

if __name__ == '__main__':
  app.run(debug=True)