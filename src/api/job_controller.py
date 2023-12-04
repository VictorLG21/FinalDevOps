from flask import request
from flask_restplus import Resource
from src.config.restplus import api
from src.api.serializers.job_serializer import job_request, job_result,job_employee_result
from src.services.job_service import create, put, delete, get, getAll

ns = api.namespace('api/job', description='Job endpoints')


@ns.route('')
class JobCollection(Resource):
    @api.expect(job_request)
    @api.marshal_with(job_result)
    def post(self):
        job = create(request.json)
        return job

    @api.marshal_with(job_result)
    def get(self):
        jobs = getAll()
        return jobs

@ns.route('/<int:id>')
class JobIDCollection(Resource):
    @api.marshal_with(job_employee_result)
    def get(self, id):
        job = get(id)
        return job

    @api.expect(job_request)
    @api.marshal_with(job_result)
    def put(self, id):
        job = put(id, request.json)
        return job

    @api.marshal_with(job_result)
    def delete(self, id):
        job = delete(id)
        return job
