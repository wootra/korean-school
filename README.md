# book-share

platform to share books

## requirements

- book owner can register their books to lend
- renter can rent books
- sign-up with id/password (MVP)
- lend menu shows up after login
- rent is allowed without login (forcing login when clicking rent button)
- on book list, renter can select books and rent books
- on account page, renter can confirm the renting books
- on account page, lender can confirm their books which is currently lending with renter
-

## model design

```mermaid
erDiagram
USER ||--o{ BOOK : owns
USER o|--o{ BOOK : rents
RENT |o..|| BOOK : renting
RENT }o..|| BOOK : "rented(previously)"
USER ||..o{ RENT : has
```

## ui route design

```mermaid
stateDiagram-v2
    [*] --> /home : [GET] /books
    /home --> nav
    nav --> logo(image)
    nav --> rent(link)
    nav --> lend(link) : when<br/> customer<br/> logged in
    nav --> about(link)
    state "login(link) or username(button)" as login_or_username
    nav --> login_or_username
    logo(image) --> /home
    rent(link) --> /rent
    state "submit" as rent_submit
    /rent --> rent_submit
    rent_submit --> /rent: [POST]/rents
    rent_submit --> /log_in: if not logged in
    lend(link) --> /lend: [GET]/lends
    state "submit" as lend_submit
    /lend --> lend_submit
    /lend --> /userinfo/lend
    lend_submit --> /lend: [POST]/lends
    about(link) --> /about
    login_or_username --> login(link) : not logged in
    login_or_username --> username(button): logged in
    login(link) --> /log_in
    username(button) --> profile(link)
    profile(link) --> /userinfo/profile
    /userinfo/profile --> save(button)
    save(button) --> /userinfo/profile
    /userinfo --> profile(link)
    profile(link) --> /userinfo/profile : [GET] /profile
    /userinfo --> renting(link)
    renting(link) --> /userinfo/rent : [GET] /rents
    /userinfo/rent --> /userinfo/rent : [POST] /rents
    /userinfo --> lending(link)
    lending(link) --> /userinfo/lend : [GET]/lends
    /userinfo/lend --> /userinfo/lend : [PATCH]/lends/{id}<br>[DELETE]/lends/{id}
    username(button) --> logout(button)
    logout(button) --> /home : logging out
    /log_in --> sign_up(button)
    sign_up(button) --> /sign_up
    state "submit" as signup_submit
    /sign_up --> signup_submit
    signup_submit --> prev_page : [POST] /sign-up
    state "previous page" as prev_page
    /log_in --> login(button)
    login(button) --> prev_page : [POST] /log-in - customer logged in
```

## backend rounte design

```mermaid
---
title: "response data"
---
classDiagram
class Book {
    +int id
    +str title
    +str author
    -int owner_id
    +str description
    +DateTime registered_date
    +BookImage[] images
    +User[] rented_users
    +User owner
}

class BookImage {
    +int id
    +int book_id
    +str image
    +str label
}

class User {
    +int id
    +str name
    +str email
    +str user_id
    +Rent[] rented_records
    +Book[] owned_books
    +Book[] rented_books
}

class Rent {
    +int id
    -int renter_id
    -int book_id
    +User renter
    +Book book
}

Book <-- User
User <-- Book
User <.. Rent
Book <.. Rent
BookImage o.. Book

```

## Sequence Diagram

### enter app (/home)

```mermaid

sequenceDiagram
    autonumber
    actor client
    Note over client: enter into app
    client ->> server: [GET]/books?limit=n&start=m
    server ->> database: get all books (limited by n, started from m*n)
    database -->> server: 
    server -->> client: Book[]
    Note over client: store books<br/>in the state
    
```

### sign up (/sign_up)

```mermaid
sequenceDiagram
actor client

Note over client: user information is given in form data
client ->> +server: [GET] /sign-up
alt validation fails
    server -->> client : 403: invalid format
end
server ->> User : count(form_data.email)
User -->> server : count
alt count != 0
    server -->> client : 409: the email already exists
end
server ->> User : add(new_user)
User -->> server : User
server -->> -client : User
Note over client: after login, should route previous page.<br/>if the previous page does not exists, <br/> go /home
client ->> client : route to previous page
```

### log in (/log_in)

```mermaid
sequenceDiagram
actor client
Note over client:  user information is given in form data
client ->> +server : [GET] /log-in
    alt validation fails
        server -->> client: 403: invalid format
    end
    server ->> User : get(form_data.email)
    critical 
        User -->> server: User
    option SomeError
        server -->> client : 404: the email does not exist
    end
    alt password does NOT matches
        server -->> client : 403: the password does not matches
    end
server -->> -client : User
Note over client: after login, should route previous page.<br/>if the previous page does not exists,<br/>go /home
client -> client : route to previous page
```

### rent (/rent)

```mermaid
sequenceDiagram
actor client
client ->> +server : [GET]/books?limit=n
    server ->> +Book : only_available(limit=n, start=0)
    Book -->> -server: all books limited by limit
server -->> -client : Book[] (limited number)
client ->> client : select books 
opt owner's book cannot be selected on client
    client ->> +server: [GET]/books?limit=n&start=m
    server ->> +Book : only_available(limit=n, start=m)
    Book -->> -server: all books limited by limit
    server -->> -client: Book[] (limited number)
    client ->> client : select books 
end

Note over client: user_id should be added in the header
client ->> +server: [POST]/rents with Book[]
    server ->> +Rent: count(user_id, selected_books)
    Rent -->> -server: count of already rented
    alt count > 0 : selected book already rented
        server -->> client: 403: already rented
    end
    critical: renting books
        loop selected books
            server ->> Rent: add(book, user_id)
        end
    option "a book's owner is renter"
        server ->> Rent: revert
        server -->> client: 401: owner cannot rent(unauthorized)
    end
    server ->> Rent: commit
    Rent -->> server: 
server -->> -client: Rent[]
```

## lend (/lend, /userinfo/lend)

### /lend (from nav bar)

```mermaid
sequenceDiagram
actor client
client ->> client: /lend
Note over client,server: user_id is in header
client ->> +server: [GET]/lends
    server ->> +Book: get_owned(user_id)
    Book -->> -server : Book[]
server -->> -client: Book[]
client ->> client: show currently lending books
Note over client,server: with selected_books<br/>user_id in header
opt
    Note over client, server: when submit
    client ->> +server: [POST]/lends
        server ->> +Book: add(new_book)
        Book -->> server: 
    server -->> -client: Book
end

```

### /userinfo/lend (from profile page > lend menu)

```mermaid
sequenceDiagram
actor client
client ->> client : /userinfo/lend
Note over client, server: user_id is in header
client ->> +server: [GET]/lends
    server ->> Book: get_owned(user_id)
    Book -->> server: 
server -->> -client: Book[]
client ->> client: show currently lending books

opt when delete button clicked
    Note over client,server: user_id in header
    client ->> +server: [DELETE]/lends/{id}
        server ->> Rent: count(user_id, id)
        Rent -->> server: count of currently rented book
        alt "count > 0"
            server -->> client: 401: the book is currently being rented
        end
        server ->> Book: get(id)
        Book -->> server: Book
        alt "book.owner_id != user_id"
            server -->> client: 401: book is not owned by the user
        end
        critical deleting
            server ->> Book : delete(book)
            Book -->> server: 
        option failed
            server -->> client: "500: failed while deleting
        end
       
    server -->> -client: "succeeded"
end

opt when submit button is clicked <br/> after changing content
    Note over client,server: user_id in header<br/> fields to update are included in body
    client ->> server: [PATCH]/lends/{id}
        server ->> Rent: count(user_id, id)
        Rent -->> server: count of currently rented book
        
        server ->> server : sanitize body (remove book price)
        
        alt "count > 0 and intersect(body, {price})"
            server -->> client:  401: price cannot be changed while it is already rented
        end
        server ->> Book: get(id)
        Book -->> server: book

        alt "book.owner_id != user_id"
            server -->> client: 401: book is not owned by the user
        end
        critical updating book
            server ->> Book: update(updated_book)
            Book -->> server: 
        option something wrong
            server -->> client: "500: failed while updating"
        end
    server -->> client: Book
end

```
