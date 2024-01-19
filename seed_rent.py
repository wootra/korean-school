from server.models.users import User
from server.models.books import Book
from server.models.rents import Rent

from server.config import db
from server.api.index import app
try:
    with app.app_context():
        
        db.session.query(User).delete()
        db.session.commit()
        
        user1 = db.session.query(User).where(User.email == 'user1@gmail.com').first()
        books = []
        if user1 is None:
            user1 = User(
                name="user1",
                email="user1@gmail.com",
                password="123",
                user_id="user1"
            )
            db.session.add(user1)
            db.session.commit()
        
        
            for i in range(10):
                book = Book(
                    title="book" + str(i),
                    author="author" + str(i),
                    owner_id=user1.id,
                    image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg",
                    description="description - Adipisicing eu ad excepteur non cupidatat sint ea adipisicing dolor. Excepteur ullamco minim aliquip laboris non exercitation ipsum. Nulla commodo laborum id minim ex ex laborum. Aute fugiat sint sunt ex id ea consequat quis laborum. Ullamco nostrud culpa dolor laborum laborum aliquip cillum nulla dolor. Amet adipisicing tempor aute enim. Do aliquip cupidatat occaecat occaecat proident reprehenderit esse eu labore sunt veniam nostrud ut id. Cillum esse pariatur culpa incididunt." + str(i)
                )
                books.append(book)
        
            db.session.add_all(books)
            db.session.commit()
        else:
            books = db.session.query(Book).where(Book.owner_id == user1.id).all()
            
        user2 = db.session.query(User).where(User.email == 'user2@gmail.com').first()
        if user2 is None:
            user2 = User(
                name="user2",
                email="user2@gmail.com",
                password="123",
                user_id="user2"
            )
            db.session.add(user2)
            db.session.commit()
        
        for book in books:
            rent = Rent(
                renter_id=user2.id,
                book_id=book.id
            )
            db.session.add(rent)
        
        db.session.commit()
except ValueError:
    print("ValueError")
