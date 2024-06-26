// const fs = require('fs');
const Movie = require('./../Models/movieModel')

// let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

// exports.checkId = (req,res,next,value) =>{
    // console.log('Movie ID is' + value);
    // let movie = movies.find(el=>el.id === value*1 );

    // if(!movie){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Movie not found'
    //     })
    // }

    // next();
// }

// exports.validateBody = (req,res,next) =>{
//     if(!req.body.name || !req.body.releaseYear){
//         return res.status(400).json({
//             status : "fail",
//             message : "Body is not present in the request"
//         })
//     }
//     next();
// }

exports.getAllMovies = async (req,res)=>{
    // res.status(200).json({            //json - JSEND json data formatting
    //     status:"success",
    //     count : movies.length,
    //     data : {
    //         movies:movies
    //     }
    // })

    try{
        const allMovies = await Movie.find();
        res.status(200).json({
            status:'success',
            length : allMovies.length,
            data : {
                allMovies
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.getMovie = async (req,res)=>{
    // console.log(req.params);
    // const id = req.params.id * 1;
    // let movie = movies.find(el=>el.id === id )
    
    // res.status(200).json({
    //     status: "success",
    //     data : {
    //         movie : movie
    //     }
    // })
    
    try{
        const movie = await Movie.find({_id:req.params.id}) 
        //const movie = await Movie.findById(req.params.id)
        res.status(200).json({
            status:'success',
            
            data : {
                movie
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message:"movie not found"
        })
    }
}

exports.updateMovie = async (req,res)=>{
    // let id = req.params.id*1;
    // let movieToUpdate = movies.find(el=>el.id===id)
    // // let index = movies.indexOf(movieToUpdate)

    // // movies[index] = movieToUpdate;

    // Object.assign(movieToUpdate,req.body)
    // fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
    //     res.status(201).json({
    //         status:"Success",
    //         data:{
    //             movie: movieToUpdate
    //         }
    //     })
    // })
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            status:'success',
            
            data : {
                updatedMovie
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:"movie not found"
        })
    }
}

exports.createMovie = async (req,res)=>{
    // const newId = movies[movies.length-1].id + 1;
    // console.log(req.body);
    // const newMovie = Object.assign({id:newId},req.body)

    // movies.push(newMovie);

    // fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
    //     res.status(201).json({
    //         status:"Success",
    //         data:{
    //             movie: newMovie
    //         }
    //     })
    // })
    //res.send("Created");

    //**creating document using Movie model */
    // const testMovie = new Movie({});
    // testMovie.save()


    /**Creating document using create and using resolving promise using then and catch */
    // Movie.create({})
    // .then(doc => {
    //     console.log(doc);
    // })
    // .catch(err => console.log(err));


    /**Creating document using create and using resolving promise using aync and await */
    try{
        const movie = await Movie.create(req.body);

        res.status(201).json({
            status: 'success',
            data : {
                movie
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:'fail',
            message: err.message
        })
    }    
}

exports.deleteMovie = async (req,res)=>{
    // const id = req.params.id*1;
    // const movieToDelete = movies.find(el=>el.id===id);


    // // if(!movieToDelete){
    // //     return res.status(404).json({
    // //         status: 'fail',
    // //         message: 'Movie not found'
    // //     })
    // // }
    // const index = movies.indexOf(movieToDelete);



    // movies.splice(index,1);
    // fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
    //     res.status(204).json({
    //         status:"Success",
    //         data:{
    //             movie: null
    //         }
    //     })
    // })

    try {
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success'
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message: err.message
        })
    }
}

