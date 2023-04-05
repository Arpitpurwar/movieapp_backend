const Theatre = require('../models/theatre.model');
const Movie = require('../models/movies.models');
const {sendMail} = require('../utils/mail');
const User = require('../models/users.models');

async function getAllTheatres(req, res){

    let reqObject = {};
    if(req.query.name){
        reqObject.name = req.query.name;
    }
    if(req.query.city){
        reqObject.city = req.query.city;
    }
    if(req.query.pinCode){
        reqObject.pinCode = req.query.pinCode;
    }
    let theaters = await Theatre.find(reqObject);

    if(req.query.movieId){
        theaters = theaters.filter(theater => theater.movies.includes(req.query.movieId));
    }

    res.send(theaters);
}

async function getTheatreBasedOnId(req, res){

    const result = await Theatre.findOne({
        _id: req.params.id
    });

    res.send(result);
}

async function createTheatre(req,res){
    const theatreObject = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        ownerId: req.body.ownerId
    }
    try{
        const theatre = await Theatre.create(theatreObject);
        const user = await User.findOne({
            _id: theatre.ownerId
        })
        await sendMail(`This theatre ${theatre.name} is available now`,JSON.stringify(theatre), user.email);

        res.status(201).send(theatre);
    }catch(err){
        res.send({
            msg : 'Theatre creation failed',
            err
        })
    }

}

async function updateTheatre(req,res){
    let savedTheatre = await Theatre.findOne({
        _id: req.params.id
    })

    if(!savedTheatre){
        return res.status(400).send({
            msg: `Theatre Id ${req.params.id} does not exist`
        })
    }

    savedTheatre.name = req.body.name ?  req.body.name: savedTheatre.name; 
    savedTheatre.description = req.body.description ?  req.body.description : savedTheatre.description; 
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode;
    savedTheatre.ownerId = req.body.ownerId != undefined ? req.body.ownerId : savedTheatre.ownerId;
    
    try{
        const updateTheatre = await savedTheatre.save();
        const user = await User.findOne({
            _id: updateTheatre.ownerId
        })
        await sendMail(`This theatre ${updateTheatre.name} is updated now`,JSON.stringify(updateTheatre), user.email);
        res.send(updateTheatre);
    }
    catch(err){
        res.send({
            msg : 'Theatre Updation failed',
            err
        })
    }

}

async function deleteTheatre(req,res){
    try{
        const savedTheatre = await Theatre.findOne({
            _id: req.params.id
        })
        await Theatre.deleteOne({
            _id : req.params.id
        })
        const user = await User.findOne({
            _id: savedTheatre.ownerId
        })
        await sendMail(`This theatre ${savedTheatre.name} is deleted now`,JSON.stringify(savedTheatre), user.email);
    return res.send(`Theatre id ${req.params.id} got deleted `);
    }catch(err){
        return res.status(500).send({ msg : 'Internal server error'});
    }

}

async function updateMoviesInTheatre(req, res){
    let savedTheatre = await Theatre.findOne(
        {
            _id : req.params.id
        }
    );
       // console.log('theatre', theatre);
    if(!savedTheatre){
        return res.status(400).send({
            msg : `This theatre ${req.params.id} does not exist in DB.`
        })
    }
    let movies = req.body.movieIds;// ['4567','3456']

    if(req.body.insert){
        // add movies in db...
        movies.forEach(movieId => {
            savedTheatre.movies.push(movieId);
        });

    }else{ // [1,2,3,4] savedTheatre -----> [1,2]
        // movie [3,4]
        movies.forEach(movieId => { 
            savedTheatre.movies = savedTheatre.movies.filter(elem => elem!= movieId);
        })
    }

   const updatedTheatre = await savedTheatre.save();
   const user = await User.findOne({
    _id: updatedTheatre.ownerId
})
await sendMail(`This theatre ${updatedTheatre.name} is Updated now`,JSON.stringify(updatedTheatre), user.email);
   res.send(updatedTheatre);
}

async function checkMovieInTheatre(req, res){
    let savedTheatre = await Theatre.findOne({
        _id: req.params.theatreId
    })

    let movie = await Movie.findOne({
        _id: req.params.movieId
    })

    let response = {
        msg : ''
    }

    if(savedTheatre.movies.includes(movie._id)){
        response.msg = 'Movie is running';
    }else{
        response.msg = 'Movie is not running';
    }

    res.send(response);
}

module.exports = {
    getAllTheatres,
    getTheatreBasedOnId,
    createTheatre,
    updateTheatre,
    deleteTheatre,
    updateMoviesInTheatre,
    checkMovieInTheatre
}