# from server.config import db
from flask import request
# from flask_restful import Resource, reqparse
from flask_restful import Resource
# from flask_restful import reqparse, abort, Api, Resource
from server.models.users import User
import sqlalchemy.sql as sql
# from server.models.books import Book
# from server.models.rents import Rent
from server.config import db


def is_invalid_params(params):
    if ('email' not in params) or ('password' not in params) or ('name' not in params) or ('user_id' not in params):
        return {"error": "required values are missing"}, 403
    existing_usr = db.session.query(User).where(
            sql.or_(
                User.email == params["email"], 
                User.user_id == params["user_id"]
            )
        ).count()
    if existing_usr > 0:
        return {"error": "email or user_id already exists"}, 409
    
    return False


class SignUpRoute(Resource):
    def post(self):
        '''sign-up'''

        params = request.form.to_dict()
        param_invalid_status = is_invalid_params(params)
        if param_invalid_status:
            return param_invalid_status
        
        user = User(
            email=params["email"],
            password=params["password"],
            name=params["name"],
            user_id=params["user_id"]
        )
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201
