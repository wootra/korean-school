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
zenuml
@Actor client
@Boundary server
@Database User
// user information is given in form data
client -> server."[GET] /sign-up"{
    if("validation fails"){
        return "403: invalid format"
    }
    User."count(form_data.email)"{
        return count
    }
    if("count != 0"){
        return "403: the email already exists"
    }
    
    User.add(new_user){
        return User
    }
    return User

}
// after login, should route previous page.
// if the previous page does not exists,
// go /home
client -> client : route to previous page

```

### log in (/log_in)

```mermaid
zenuml
@Actor client
@Boundary server
@Database User
// user information is given in form data
client -> server."[GET] /log-in"{
    if("validation fails"){
        return "403: invalid format"
    }

    try{
        User."get(form_data.email)"{
            return User
        }
    }catch{
        return "404: the email does not exist"
    }

    if("password does NOT matches"){
        return "403: the password does not matches"
    }
    
    return User

}
// after login, should route previous page.
// if the previous page does not exists,
// go /home
client -> client : route to previous page

```

### rent (/rent)

```mermaid
zenuml
title rent process
@Actor client
@Boundary server
@Database Book
@Database Rent
client -> server."[GET]/books?limit=n" {
    Book.only_available(limit=n, start=0){
        return "all books limited by limit"
    }
    return "Book[] (limited number)"
}
// (owner's book cannot be selected on client)
client -> client : select books 
opt {
    client -> server."[GET]/books?limit=n&start=m" {
        Book.only_available(limit=n, start=m){
            return "all books limited by limit"
        }
        return "Book[] (limited number)"
    }
    // (owner's book cannot be selected on client)
    client -> client : select books 
}
// user_id should be added in the header
client -> server."[POST]/rents with Book[]"{
    Rent.count(user_id, selected_books){
        return "count of already rented"
        
    }   
    if("count > 0 : selected book already rented"){
        @return
        server->client: 403: already rented
    }
    try{
        while("selected books") {
            Rent.add(book, user_id)
        }
        Rent.commit()
    }catch{
        Rent.revert()
        if("a book's owner is renter"){
            return "401: owner cannot rent(unauthorized)"
        }else{
            return "500: failed"
        }
    }
    
    return "succeeded" 
}

```

## lend (/lend, /userinfo/lend)

```mermaid
zenuml
title /lend (from nav bar)
@Actor client
@Boundary server
@Database Book
client -> client : /lend

client -> server."[GET]/lends"{
    // user_id is in header
    Book.get_owned(user_id){
        return "Book[]"
    }
    return "Book[]"
}

client -> client: show currently lending books
// when submit
opt {
    // with selected_books
    // user_id in header
    client -> server."[POST]/lends"{
        Book.add(new_book){
            return
        }
        return Book
    }
}

```

```mermaid
zenuml
title /userinfo/lend (from profile page > lend menu)
@Actor client
@Boundary server
@Database Book
@Database Rent
client -> client : /userinfo/lend

client -> server."[GET]/lends"{
    // user_id is in header
    Book.get_owned(user_id){
        return "Book[]"
    }
    return "Book[]"
}

client -> client: show currently lending books
// when delete button clicked
opt {
    // user_id in header
    client -> server."[DELETE]/lends/{id}"{
        Rent.count(user_id, id){
            return "count of currently rented book"
        }
        if(count > 0){
            return "401: the book is currently being rented"
        }
        Book.get(id){
            return Book
        }
        if(book.owner_id != user_id){
            return "401: book is not owned by the user"
        }
        try{
            Book.delete(book){
                return
            }
            return "succeeded"
        }catch{
            return "500: failed while deleting"
        }
    }
}

// when submit button is clicked 
// after changing content
opt {
    // user_id in header
    // fields to update are included in body
    client -> server."[PATCH]/lends/{id}"{
        
        Rent.count(user_id, id){
            return "count of currently rented book"
        }
        
        server -> server : sanitize body (remove book price)
        
        if("count > 0 and intersect(body, {price})"){
            return "401: price cannot be changed while it is already rented"
        }
        Book.get(id){
            return Book
        }
        if(book.owner_id != user_id){
            return "401: book is not owned by the user"
        }
        try{
            Book."update(updated_book)"{
                return
            }
            return Book
        }catch{
            return "500: failed while updating"
        }
    }
}

```
