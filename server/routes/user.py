# from server.config import db
# from flask import request
from flask_restful import Resource, reqparse
# from flask_restful import Resource
# from flask_restful import reqparse, abort, Api, Resource
from server.models.users import User


class UsersRoute(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users
    
    def post(self):
        '''sign-in'''
        pass
        
    # def post(self):
    #     print("args:", request.args.to_dict())
    #     print("body:", request.form.to_dict())
    #     res = {}
    #     # to validation:
    #     a = request.args.get("a", type=int, default=0)
        
    #     print("a is", type(a))
    #     res["params"] = request.args.to_dict()
    #     res["body"] = request.form.to_dict()

        # return res

