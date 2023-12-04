from src.models import db
from src.models.job import Job
from src.config.restx import json_abort
from sqlalchemy.exc import SQLAlchemyError
from src.models.employee import Employee

def create(data):
    try:

        name = data.get('name')
        if not name:
            json_abort(400, "Name is required")

        description = data.get('description')
        if not description:
            json_abort(400, "description is required")

        job = Job(name=name, description=description)
        db.session.add(job)
        db.session.commit()

        return job

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def get(id):
    try:
        job = Job.query.filter_by(jobID=id).first()
        job.employee = Employee.query.filter_by(jobID=id)
        if not job:
            json_abort(400, "Job not found")
        else:
            return job

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def getAll():
    try:
        jobs = Job.query.all()
        return jobs

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def put(id, data):
    try:

        job = Job.query.filter_by(jobID=id).first()

        if not job:
            json_abort(400, "job not found")
        else:
            name = data.get('name')
            if not name:
                json_abort(400, "Name is required")

            description = data.get('description')
            if not description:
                json_abort(400, "description is required")

            job.name = name
            job.description = description

            db.session.commit()

            return job

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)


def delete(id):
    try:
        job = Job.query.filter_by(jobID=id).first()

        if not job:
            json_abort(400, "Job not found")
        else:
            db.session.delete(job)
            db.session.commit()

            return job

    except SQLAlchemyError as err:
        db.session.rollback()
        error = str(err.__dict__['orig'])
        json_abort(500, error)