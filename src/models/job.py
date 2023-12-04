from . import db


class Job(db.Model):
    __tablename__ = 'job'

    jobID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text())
    description = db.Column(db.Text())

    def __str__(self):
        return self.name

    def get_job_id(self):
        return self.jobID
