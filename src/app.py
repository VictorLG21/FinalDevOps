from flask import Flask, Blueprint
from src.config.restplus import api, init_config
from src.config.settings import config_by_name
from src.models import db
from src.api.job_controller import ns as job_namespace
from src.api.employee_controller import ns as employee_namespace
from src.api.jobHistory_controller import ns as jobHistory_namespace


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    setup_app(app)

    return app


def setup_app(app):
    @app.before_first_request
    def create_tables():
        db.create_all()

    db.init_app(app)

    blueprint = Blueprint('api', __name__, url_prefix='/api')

    api.init_app(blueprint)
    init_config(app)

    api.add_namespace(job_namespace)
    api.add_namespace(employee_namespace)
    api.add_namespace(jobHistory_namespace)

    app.register_blueprint(blueprint, url_prefix='')

    if __name__ == "__main__":
        app.run(debug=True, host='0.0.0.0')
