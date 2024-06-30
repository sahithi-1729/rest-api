const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')
const Movie = require('../Models/movieModel')

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser : true
}).then((conn)=>{
    //console.log(conn)
    //console.log('DB connection successful')
}).catch((err)=>{
    console.log('some error has occured');
})

//READ movies.json file
const movies  = JSON.parse(fs.readFileSync('./data/movies.json','utf-8'))

//Delete exisitng docs
const deleteMovies = async () =>{
    try {
        await Movie.deleteMany();
        console.log('Data successfully deleted')
    } catch (error) {
        console.log(error.message);
    }
    process.exit();
}

//Importing data from movies.json
const importMovies = async ()=>{
    try {
        await Movie.create(movies);
        console.log('Data successfully imported')
    } catch (error) {
        console.log(error.message)
    }
    process.exit();
}

// deleteMovies();
// importMovies();

// console.log(process.argv)

if(process.argv[2]=='--import') importMovies();
if(process.argv[2]=='--delete') deleteMovies();