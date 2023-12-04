from . import db


class Employee(db.Model):
    __tablename__ = 'employee'

    employeeID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text())
    birthday = db.Column(db.DateTime)
    jobID = db.Column(db.Integer, db.ForeignKey('job.jobID'))
    job = db.relationship('Job')
    salary = db.Column(db.Float(10.2))
    department = db.Column(db.Text())

    def __str__(self):
        return self.name

    def get_employee_id(self):
        return self.employeeID
