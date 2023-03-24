const { getAllTheatres, getTheatreBasedOnId, createMovie, updateMovie, deleteMovie } = require('../controller/theatre.controller');


module.exports = (app) => {
    app.get('/mba/api/v1/theatres', getAllTheatres);   
    app.get('/mba/api/v1/theatre/:id', getTheatreBasedOnId); 
    app.post('/mba/api/v1/theatre',createMovie); 
    app.put('/mba/api/v1/theatre/:id', updateMovie);
    app.delete('/mba/api/v1/theatre/:id', deleteMovie);
}