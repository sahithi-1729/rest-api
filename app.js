const express = require('express')
const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

let app = express();
const port = 3000;

app.use(express.json())

//GET - api/movies (endpoint)
//v1- version - for existing customers application not to crash when we make changes we can make into new version
app.get('/api/v1/movies',(req,res)=>{
    res.status(200).json({            //json - JSEND json data formatting
        status:"success",
        count : movies.length,
        data : {
            movies:movies
        }
    })
})

//GET - route parameters - api/v1/movies/id
//GETTING A MOVIE USING ID AND POSTING IT
app.get('/api/v1/movies/:id',(req,res)=>{
    console.log(req.params);
    const id = req.params.id * 1;
    let movie = movies.find(el=>el.id === id
    )

    if(!movie){
        return res.status(404).json({
            status: 'fail',
            message: 'Movie not found'
        })
    }
    res.status(200).json({
        status: "success",
        data : {
            movie : movie
        }
    })

})

//PATCH
app.patch('/api/v1/movies/:id',(req,res)=>{
    let id = req.params.id*1;
    let movieToUpdate = movies.find(el=>el.id===id)
    // let index = movies.indexOf(movieToUpdate)

    // movies[index] = movieToUpdate;

    Object.assign(movieToUpdate,req.body)
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:"Success",
            data:{
                movie: movieToUpdate
            }
        })
    })

})

//using multiple route parameters and use ? to make it optional
// app.get('/api/v1/movies/:id/:name/:x?',(req,res)=>{
//     console.log(req.params);
//     res.send('Test movies')
// })




// POST - api/movies
app.post('/api/v1/movies',(req,res)=>{
    const newId = movies[movies.length-1].id + 1;
    console.log(req.body);
    const newMovie = Object.assign({id:newId},req.body)

    movies.push(newMovie);

    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:"Success",
            data:{
                movie: newMovie
            }
        })
    })
    //res.send("Created");
})

app.listen(port,()=>{
    console.log("Server is running");
})