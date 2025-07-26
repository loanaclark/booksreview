const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const books = {
  "123": { isbn: "123", title: "Book One", author: "Author A", reviews: {} },
  "456": { isbn: "456", title: "Book Two", author: "Author B", reviews: {} },
  "789": { isbn: "789", title: "Book Three", author: "Author A", reviews: {} }
};

const JWT_SECRET = ''; 

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

router.get('/books', (req, res) => {
  res.json(Object.values(books));
});

router.get('/books/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

router.get('/books/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const filtered = Object.values(books).filter(book => book.author.toLowerCase() === author);
  if (filtered.length === 0) return res.status(404).json({ message: 'No books found by that author' });
  res.json(filtered);
});

router.get('/books/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const filtered = Object.values(books).filter(book => book.title.toLowerCase() === title);
  if (filtered.length === 0) return res.status(404).json({ message: 'No books found with that title' });
  res.json(filtered);
});

router.get('/books/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book.reviews);
});

router.post('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const reviewText = req.body.review;
  if (!reviewText) return res.status(400).json({ message: 'Review text required' });

  book.reviews[req.user.username] = reviewText;
  res.json({ message: 'Review added/updated successfully', reviews: book.reviews });
});

router.delete('/review/:isbn', authenticateToken, (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });

  if (!book.reviews[req.user.username]) return res.status(404).json({ message: 'Review not found for this user' });

  delete book.reviews[req.user.username];
  res.json({ message: 'Review deleted successfully', reviews: book.reviews });
});

module.exports = router;
