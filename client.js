const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log('All books:', response.data);
  } catch (error) {
    console.error('Error getting all books:', error.message);
  }
}

function searchByISBN(isbn) {
  axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(response => {
      console.log(`Book with ISBN ${isbn}:`, response.data);
    })
    .catch(error => {
      console.error('Error searching by ISBN:', error.response?.data || error.message);
    });
}

async function searchByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${encodeURIComponent(author)}`);
    console.log(`Books by author "${author}":`, response.data);
  } catch (error) {
    console.error('Error searching by author:', error.response?.data || error.message);
  }
}

async function searchByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${encodeURIComponent(title)}`);
    console.log(`Books with title "${title}":`, response.data);
  } catch (error) {
    console.error('Error searching by title:', error.response?.data || error.message);
  }
}

(async () => {
  await getAllBooks();
  searchByISBN('123');
  await searchByAuthor('Author A');
  await searchByTitle('Book Two');
})();
