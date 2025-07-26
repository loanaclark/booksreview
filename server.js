const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

app.use('/', bookRoutes);
app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
