from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy_serializer import SerializerMixin

from server.config import db
# from server.models.users import User
from server.models.rents import Rent


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"
    serialize_rules = (
        '-owner.owned_books',
        '-book',
        '-owner.rented_books',
        '-rented_records',
    )
    id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
    title: Mapped[String] = mapped_column(String, nullable=False)
    author: Mapped[String] = mapped_column(String, nullable=False)
    owner_id: Mapped[Integer] = mapped_column(
        ForeignKey('users.id'), nullable=False)
    description: Mapped[String] = mapped_column(String, nullable=True)
    image: Mapped[String] = mapped_column(String, nullable=True)

    owner = relationship('User', back_populates='owned_books')
    rented_records: Mapped[List["Rent"]] = relationship(
        'Rent', back_populates='book', cascade="all, delete-orphan")

    rented_users: AssociationProxy[List] = association_proxy(
        'rented_records', 'user')
