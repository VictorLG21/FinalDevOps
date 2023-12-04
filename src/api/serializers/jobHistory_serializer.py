from flask_restx import fields
from src.config.restx import api


jobHistory_request = api.model('JobHistory Request', {
    'title': fields.String(required=True, description='text jobHistory'),
    'salary': fields.Float(required=True, description='text jobHistory'),
    'startDate': fields.String(required=True, description='jobHistory student ID '),
    'employeeID': fields.Integer(required=True, description='integer jobHistory')
})

jobHistory_result = api.model('JobHistory Result', {
    'jobHistoryID': fields.Integer(required=True, description='jobHistory Id'),
    'title': fields.String(required=True, description='text jobHistory'),
    'salary': fields.Float(required=True, description='text jobHistory'),
    'employeeID': fields.Integer(required=True, description='jobHistory student ID '),
    'startDate': fields.String(required=True, description='date jobHistory created'),
    'endDate': fields.String(required=True, description='date jobHistory created')
})
