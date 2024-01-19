from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from server.config import db
from sqlalchemy_serializer import SerializerMixin
# from server.models.books import Book
from server.models.rents import Rent


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    serialize_rules = ('-owned_books.owner',
                       '-rented_books.rented_users'
                       '-rented_records',
                       '-renter',
                       '-password')
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[String] = mapped_column(String, nullable=False)
    email: Mapped[String] = mapped_column(String, nullable=False)
    password: Mapped[String] = mapped_column(String, nullable=False)
    user_id: Mapped[String] = mapped_column(String, nullable=False)

    rented_records: Mapped[List["Rent"]] = relationship(
        'Rent', back_populates='renter', cascade="all, delete-orphan")
    owned_books = relationship(
        'Book', back_populates='owner', cascade="all, delete-orphan")
    rented_books: AssociationProxy[List] = association_proxy(
        'rented_records', 'book')
