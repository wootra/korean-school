from server.models.users import User
from server.models.books import Book
from server.models.rents import Rent

from server.config import db
from server.api.index import app
try:
    with app.app_context():
        user1 = User(
            name="user1",
            email="user1@gmail.com",
            password="123",
            user_id="user1"
        )
        db.session.add(user1)
        
except ValueError:
    print("ValueError")
