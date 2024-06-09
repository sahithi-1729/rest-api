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

// POST - api/movies
app.post('/api/v1/movies',(req,res)=>{
    const newId = movies[movies.length-1] + 1;
    console.log(req.body);
    const newMovie = Object.assign({id:newId},req.body)

    movies.push(newMovie);

    fs.writeFile('./data/movies.json',JSON.stringify(newMovie),(err)=>{
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