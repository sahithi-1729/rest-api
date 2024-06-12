const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

exports.getAllMovies = (req,res)=>{
    res.status(200).json({            //json - JSEND json data formatting
        status:"success",
        count : movies.length,
        data : {
            movies:movies
        }
    })
}

exports.getMovie = (req,res)=>{
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

}

exports.updateMovie = (req,res)=>{
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

}

exports.createMovie = (req,res)=>{
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
}

exports.deleteMovie = (req,res)=>{
    const id = req.params.id*1;
    const movieToDelete = movies.find(el=>el.id===id);


    if(!movieToDelete){
        return res.status(404).json({
            status: 'fail',
            message: 'Movie not found'
        })
    }
    const index = movies.indexOf(movieToDelete);



    movies.splice(index,1);
    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(204).json({
            status:"Success",
            data:{
                movie: null
            }
        })
    })
}

