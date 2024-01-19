# from server.config import db
from flask import request
from flask_restful import Resource, reqparse
# from flask_restful import Resource
# from flask_restful import reqparse, abort, Api, Resource
from server.models.users import User
from server.models.books import Book
from server.models.rents import Rent


class BooksRoute(Resource):
    def get(self):
        args = request.args.to_dict()
        query = {}
        if "title" in args:
            query["title"] = args["search"]
            
        if "title" in args:
            query["title"] = args["search"]
            
        if "title" in args:
            query["title"] = args["search"]
            
        if "title" in args:
            query["title"] = args["search"]
            
        Book.query.filter_by(**query).limit()
        print(args)
        books = [book.to_dict() for book in Book.query.all()]
        return books
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            'a', type=int, help='a should be an integer')
        parser.add_argument(
            'b', type=int, help='b should be an integer')
        parser.add_argument(
            'c', type=int, help='c should be an integer')
        parser.add_argument(
            'd', type=int, help='d should be an integer')
        params = parser.parse_args()
        print(params)
        return params

