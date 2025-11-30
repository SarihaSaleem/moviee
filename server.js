const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// mount your routes here
const movieRoutes = require('./routes/movies');
app.use('/', movieRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
module.exports = app;
