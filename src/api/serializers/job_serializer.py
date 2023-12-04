from flask_restx import fields
from src.config.restx import api
from src.api.serializers.employee_serializer import employee_result

job_request = api.model('Job Request', {
    'name': fields.String(required=True, description='text job') ,
    'description': fields.String(required=True, description='text job')
})

job_result = api.model('Job Result', {
    'jobID': fields.Integer(required=True, description='Job Id'),
    'name': fields.String(required=True, description='text job'),
    'description': fields.String(required=True, description='text job')
})

job_employee_result = api.model('Job Employee Result', {
    'id' : fields.Integer(required=True, description='job id'),
    'name': fields.String(required=True, description='text job'), 
    'description' : fields.String(required=True, description='text description'),
    'employee' : fields.List(fields.Nested(employee_result), description='list employee')
})