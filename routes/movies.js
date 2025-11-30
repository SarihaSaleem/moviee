const express = require('express');
const routes = express.Router();

//Temporary in-memory movie storage
let movies = [];
let currentId = 1;

// POST /api/movies - Add a new movie
routes.post('/api/movies', (req, res) => {
  const {movieTitle, director, reviewText, rating} = req.body;
    if (!movieTitle || !director || !reviewText || !rating) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
    const newMovie = {
    id: currentId++,
    title: movieTitle,
    director,
    review: reviewText,
    rating
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
}
);

// GET /api/movies - Get all movies
routes.get('/api/movies', (req, res) => {
  res.json(movies);
}
);


//GET /api/movies/:id - Get movie by ID
routes.get('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);
    const movie = movies.find(m => m.id === movieId);
    if (!movie) {
    return res.status(404).json({ error: 'Movie not found.' });
  }
    res.json(movie);
}
);
//PUT /api/movies/:id - Update movie by ID(update review and rating only)
routes.put('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const { reviewText, rating } = req.body;
    const movie = movies.find(m => m.id === movieId);
    if (!movie) {
    return res.status(404).json({ error: 'Movie not found.' });
  }
    if (reviewText) movie.review = reviewText;
    if (rating) movie.rating = rating;
    res.status(200).json(movie);
}
);

  



//DELETE /api/movies/:id - Delete movie by ID
routes.delete('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);  
    const movieIndex = movies.findIndex(m => m.id === movieId);
    if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found.' });
  }
    movies.splice(movieIndex, 1);
    res.status(200).json({ message: 'Movie deleted successfully.' });
}   
);

module.exports = routes;