from flask import request
from flask_restx import Resource
from src.config.restx import api
from src.api.serializers.jobHistory_serializer import jobHistory_request, jobHistory_result
from src.services.jobHistory_service import create, put, delete, get, getAll

ns = api.namespace('api/jobHistory', description='Job history endpoints')


@ns.route('')
class JobHistoryCollection(Resource):
    @api.expect(jobHistory_request)
    @api.marshal_with(jobHistory_result)
    def post(self):
        jobHistory = create(request.json)
        return jobHistory

    @api.marshal_with(jobHistory_result)
    def get(self):
        tests = getAll()
        return tests

@ns.route('/<int:id>')
class JobHistoryIDCollection(Resource):
    @api.marshal_with(jobHistory_result)
    def get(self, id):
        jobHistory = get(id)
        return jobHistory

    @api.expect(jobHistory_request)
    @api.marshal_with(jobHistory_result)
    def put(self, id):
        jobHistory = put(id, request.json)
        return jobHistory

    @api.marshal_with(jobHistory_result)
    def delete(self, id):
        jobHistory = delete(id)
        return jobHistory