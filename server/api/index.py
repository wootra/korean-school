from flask import Flask
from flask_migrate import Migrate
from server.config import db
import server.env_vars as env_vars
from flask_restful import Api
from server.routes.user import UsersRoute
from server.routes.book import BooksRoute
from server.routes.rents import RentsRoute
from server.routes.sign_up import SignUpRoute
from server.routes.log_in import LogInRoute
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

migrate = Migrate(app, db)
app.config.from_object(env_vars)

db.init_app(app)
api = Api(app)


api.add_resource(UsersRoute, '/api/users')
api.add_resource(BooksRoute, '/api/books')
api.add_resource(RentsRoute, '/api/rents')
api.add_resource(SignUpRoute, '/api/sign-up')
api.add_resource(LogInRoute, '/api/log-in')
