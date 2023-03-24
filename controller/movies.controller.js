const Movie = require("../models/movies.models");


async function getAllMovies(req, res){

    let reqObject = {};
    if(req.query.name){
        reqObject.name = req.query.name;
    }
    const result = await Movie.find(reqObject);

    res.send(result);
}

async function getMovieBasedOnId(req, res){

    const result = await Movie.find({
        _id: req.params.id
    });

    res.send(result);
}

async function createMovie(req,res){
    const movieObject = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        director: req.body.director,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        releaseSatus: req.body.releaseSatus
    }

    const movie = await Movie.create(movieObject);
    res.status(201).send(movie);
}

module.exports = {
    getAllMovies,
    getMovieBasedOnId,
    createMovie
}