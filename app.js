const express = require('express')
const fs = require('fs');
const morgan = require('morgan')
const moviesRouter = require('./Routes/moviesRoutes')

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));//JSON to js object

let app = express();
const port = 3000;

//CUSTOM MIDDLEWARE
// A middleware function always has 3 parameters req,res,next
const logger = function(req,res,next){
    console.log('Custom middleware created')
    next()
}

app.use(express.json()) //middleware
app.use(morgan('dev'))//we are using () after invoking middlewares bcz they are going to return a function which is a
//middleware while logger is the middlware itself
app.use(logger) //app.use() to use any middleware 


//Mounting routes in express - refer notes

// const getAllMovies = (req,res)=>{
//     res.status(200).json({            //json - JSEND json data formatting
//         status:"success",
//         count : movies.length,
//         data : {
//             movies:movies
//         }
//     })
// }

// const getMovie = (req,res)=>{
//     console.log(req.params);
//     const id = req.params.id * 1;
//     let movie = movies.find(el=>el.id === id
//     )

//     if(!movie){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Movie not found'
//         })
//     }
//     res.status(200).json({
//         status: "success",
//         data : {
//             movie : movie
//         }
//     })

// }

// const updateMovie = (req,res)=>{
//     let id = req.params.id*1;
//     let movieToUpdate = movies.find(el=>el.id===id)
//     // let index = movies.indexOf(movieToUpdate)

//     // movies[index] = movieToUpdate;

//     Object.assign(movieToUpdate,req.body)
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(201).json({
//             status:"Success",
//             data:{
//                 movie: movieToUpdate
//             }
//         })
//     })

// }

// const createMovie = (req,res)=>{
//     const newId = movies[movies.length-1].id + 1;
//     console.log(req.body);
//     const newMovie = Object.assign({id:newId},req.body)

//     movies.push(newMovie);

//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(201).json({
//             status:"Success",
//             data:{
//                 movie: newMovie
//             }
//         })
//     })
//     //res.send("Created");
// }

// const deleteMovie = (req,res)=>{
//     const id = req.params.id*1;
//     const movieToDelete = movies.find(el=>el.id===id);


//     if(!movieToDelete){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Movie not found'
//         })
//     }
//     const index = movies.indexOf(movieToDelete);



//     movies.splice(index,1);
//     fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
//         res.status(204).json({
//             status:"Success",
//             data:{
//                 movie: null
//             }
//         })
//     })
// }

//GET - api/movies (endpoint)
//v1- version - for existing customers application not to crash when we make changes we can make into new version
// app.get('/api/v1/movies')

// //GET - route parameters - api/v1/movies/id
// //GETTING A MOVIE USING ID AND POSTING IT
// app.get('/api/v1/movies/:id')

// //PATCH
// app.patch('/api/v1/movies/:id')

// //using multiple route parameters and use ? to make it optional
// // app.get('/api/v1/movies/:id/:name/:x?',(req,res)=>{
// //     console.log(req.params);
// //     res.send('Test movies')
// // })

// // POST - api/movies
// app.post('/api/v1/movies')


// //delete 
// app.delete('/api/v1/movies/:id')

// const moviesRouter = express.Router();
// moviesRouter.route('/')
//     .get(getAllMovies)
//     .post(createMovie)

// moviesRouter.route('/:id')
//     .get(getMovie)
//     .patch(updateMovie)
//     .delete(deleteMovie)

app.use('/api/v1/movies/', moviesRouter)

module.exports = app;


//watch 38th video of procademy to understand how to refactor the code :)