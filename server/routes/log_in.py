# from server.config import db
from flask import request
# from flask_restful import Resource, reqparse
from flask_restful import Resource
# from flask_restful import reqparse, abort, Api, Resource
from server.models.users import User
# from server.models.books import Book
# from server.models.rents import Rent
from server.config import db
from re import fullmatch

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
 
def is_invalid_params(params):
    if ('email' not in params) or ('password' not in params):
        return {"error": "required values are missing"}, 403
    if fullmatch(regex, params['email']) == None:
        return {"error": "email is invalid"}, 403
    
    return False
    

class LogInRoute(Resource):
    def post(self):
        
        params = request.form.to_dict()
        print(params)
        param_invalid_status = is_invalid_params(params)
        if param_invalid_status:
            return param_invalid_status
        
        existing_usr = db.session.query(User).where(
                User.email == params["email"]
            ).first()
        
        if existing_usr is None:
            return {"error": "email does not exist"}, 404
        
        if existing_usr.password != params["password"]:
            return {"error": "password is incorrect"}, 403
        
        return existing_usr.to_dict(), 200
    
