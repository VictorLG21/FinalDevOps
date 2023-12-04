from src.models import db
from src.models.jobHistory import JobHistory
from src.config.restplus import json_abort
from sqlalchemy.exc import SQLAlchemyError
import datetime

from src.models.employee import Employee
from src.services.employee_service import get as get_employee


def create(data):
    try:
        title = data.get('title')
        if not title:
            json_abort(400, "title is required")

        salary = data.get('salary')
        if not salary:
            json_abort(400, "salary is required")

        startDate = datetime.date(int(data.get('startDate')[0:4]), int(data.get('startDate')[5:7]), int(data.get('startDate')[8:]))
        if not startDate:
            json_abort(400, "startDate is required")

        employeeID = data.get('employeeID')
        if not employeeID:
            json_abort(400, "employeeID is required")

        employee = get_employee(employeeID)

        endDate = datetime.datetime.now()

        jobHistory = JobHistory(title=title, endDate=endDate, employeeID=employeeID, employee=employee, salary=salary,
                                startDate=startDate)
        db.session.add(jobHistory)
        db.session.commit()

        return jobHistory

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def get(id):
    try:
        jobHistory = JobHistory.query.join(Employee, Employee.employeeID == JobHistory.employeeID) \
            .filter(JobHistory.jobHistoryID == id).first()

        if not jobHistory:
            json_abort(400, "Job History not found")
        else:
            return jobHistory

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)

def getAll():
    try:
        tests = JobHistory.query.all()
        return tests

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)

def put(id, data):
    try:
        jobHistory = JobHistory.query.filter_by(jobHistoryID=id).first()

        if not jobHistory:
            json_abort(400, "Job History not found")
        else:

            title = data.get('title')
            if not title:
                json_abort(400, "title is required")

            salary = data.get('salary')
            if not salary:
                json_abort(400, "salary is required")

            startDate = datetime.date(int(data.get('startDate')[0:4]), int(data.get('startDate')[5:7]), int(data.get('startDate')[8:]))
            if not startDate:
                json_abort(400, "startDate is required")

            jobHistory.text = title
            jobHistory.salary = salary
            jobHistory.startDate = startDate

            db.session.commit()

            return jobHistory

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def delete(id):
    try:
        jobHistory = JobHistory.query.filter_by(jobHistoryID=id).first()

        if not jobHistory:
            json_abort(400, "Job History not found")
        else:
            db.session.delete(jobHistory)
            db.session.commit()

            return jobHistory

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)