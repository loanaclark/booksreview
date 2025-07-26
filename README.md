# Online Book Review Application Backend

This Node.js and Express backend provides:

- Book retrieval by ISBN, author, title
- User registration and login with JWT authentication
- Adding, modifying, deleting book reviews by authenticated users

## How to run

1. `npm install`
2. `npm start`
3. Use Postman or other tools to test endpoints

## API Endpoints

- GET /books - Get all books
- GET /books/isbn/:isbn - Get book by ISBN
- GET /books/author/:author - Get books by author
- GET /books/title/:title - Get books by title
- GET /books/review/:isbn - Get reviews for a book
- POST /register - Register user
- POST /login - Login user (returns JWT token)
- POST /review/:isbn - Add or modify review (requires token)
- DELETE /review/:isbn - Delete your review (requires token)
