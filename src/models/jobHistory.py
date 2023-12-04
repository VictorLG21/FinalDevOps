from . import db


class JobHistory(db.Model):
    __tablename__ = 'jobHistory'

    jobHistoryID = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text())
    employeeID = db.Column(db.Integer, db.ForeignKey('employee.employeeID', ondelete='CASCADE'))
    employee = db.relationship('Employee')
    salary = db.Column(db.Float)
    job = db.Column(db.Text())
    startDate = db.Column(db.DateTime)
    endDate = db.Column(db.DateTime)

    def __str__(self):
        return self.concept

    def get_employee_id(self):
        return self.jobHistoryID
