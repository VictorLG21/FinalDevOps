from src.models import db
from src.models.employee import Employee
from src.config.restx import json_abort
from sqlalchemy.exc import SQLAlchemyError
import datetime
from src.models.jobHistory import JobHistory




def create(data):
    try:
        name = data.get('name')
        if not name:
            json_abort(400, "Name is required")

        jobID = data.get('jobID')
        if not jobID:
            json_abort(400, "jobID is required")

        salary = data.get('salary')
        if not salary:
            json_abort(400, "Salary is required")

        department = data.get('department')
        if not department:
            json_abort(400, "department is required")


        birthday = datetime.date(int(data.get('birthday')[0:4]), int(data.get('birthday')[5:7]), int(data.get('birthday')[8:]))
        if not birthday:
            json_abort(400, "birthday is required")

        employee = Employee(name=name, birthday=birthday, jobID=jobID, salary=salary, department=department)
        db.session.add(employee)
        db.session.commit()

        return employee

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def get(id):
    try:
        employee = Employee.query.filter(Employee.employeeID == id).first()
      

        if not employee:
            json_abort(400, "Employee not found")
        else:
            return employee

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def getAll():
    try:
        employees = Employee.query.all()
        return employees

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)

def put(id, data):
    try:

        employee = Employee.query.filter_by(employeeID=id).first()
        name = data.get('name')
        if not name:
            json_abort(400, "Name is required")

        jobID = data.get('jobID')
        if not jobID:
            json_abort(400, "jobID is required")

        salary = data.get('salary')
        if not salary:
            json_abort(400, "Salary is required")

        department = data.get('department')
        if not department:
            json_abort(400, "department is required")


        birthday = datetime.date(int(data.get('birthday')[0:4]), int(data.get('birthday')[5:7]), int(data.get('birthday')[8:]))
        if not birthday:
            json_abort(400, "birthday is required")

        employee.name = name
        employee.jobID = jobID
        employee.salary = salary
        employee.department = department
        employee.birthday = birthday
        db.session.commit()
        return employee

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def delete(id):
    try:

        employee = Employee.query.filter_by(employeeID=id).first()

        if not employee:
            json_abort(400, "Employee not found")
        else:
            db.session.delete(employee)
            db.session.commit()

            return employee

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)
