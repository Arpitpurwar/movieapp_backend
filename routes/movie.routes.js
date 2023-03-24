const { getAllMovies, getMovieBasedOnId, createMovie } = require('../controller/movies.controller');
const { validateMovieReqBody } = require('../middleware');

module.exports = (app) => {
    app.get('/mba/api/v1/movies', getAllMovies);   
    app.get('/mba/api/v1/movies/:id', getMovieBasedOnId); 
    app.post('/mba/api/v1/movies', validateMovieReqBody ,createMovie); 

}