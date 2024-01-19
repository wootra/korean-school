# from server.config import db
# from flask import request
from flask_restful import Resource, reqparse
# from flask_restful import Resource
# from flask_restful import reqparse, abort, Api, Resource
from server.models.users import User
from server.models.books import Book
from server.models.rents import Rent


class RentsRoute(Resource):
    def get(self):
        rents = [rent.to_dict() for rent in Rent.query.all()]
        return rents
