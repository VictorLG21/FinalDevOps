from flask import request
from flask_restplus import Resource
from src.config.restplus import api
from src.api.serializers.employee_serializer import employee_request, employee_result
from src.services.employee_service import create, put, delete, get, getAll

ns = api.namespace('api/employee', description='Employee endpoints')


@ns.route('')
class EmployeeCollection(Resource):
    @api.expect(employee_request)
    @api.marshal_with(employee_result)
    def post(self):
        employee = create(request.json)
        return employee

    @api.marshal_with(employee_result)
    def get(self):
        employees = getAll()
        return employees

@ns.route('/<int:id>')
class EmployeeIDCollection(Resource):
    @api.marshal_with(employee_result)
    def get(self, id):
        employee = get(id)
        return employee

    @api.expect(employee_request)
    @api.marshal_with(employee_result)
    def put(self, id):
        employee = put(id, request.json)
        return employee

    @api.marshal_with(employee_result)
    def delete(self, id):
        employee = delete(id)
        return employee