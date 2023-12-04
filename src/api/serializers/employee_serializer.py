from flask_restplus import fields
from src.config.restplus import api
from src.api.serializers.jobHistory_serializer import jobHistory_result


employee_request = api.model('Employee Request', {
    'name': fields.String(required=True, description='text employee'),
    'salary': fields.Float(required=True, description='text employee'),
    'department': fields.String(required=True, description='text employee'),
    'jobID': fields.Integer(required=True, description='employee job ID '),
    'birthday': fields.String(required=True, description='date employee ')
})

employee_result = api.model('Employee Result', {
    'employeeID': fields.Integer(required=True, description='employee Id'),
    'name': fields.String(required=True, description='text employee'),
    'salary': fields.Float(required=True, description='text employee'),
    'department': fields.String(required=True, description='text employee'),
    'jobID': fields.Integer(required=True, description='employee job ID '),
    'birthday': fields.String(required=True, description='date employee ')
})





