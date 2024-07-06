// const fs = require('fs');
const Movie = require('./../Models/movieModel')
const ApiFeatures = require('./../Utils/ApiFeatures')

exports.getHighestRated = (req,res,next)=>{

        req.query.limit = '5';
        req.query.sort = '-ratings';

        next();
}

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
        const features  = new ApiFeatures(Movie.find(),req.query).filter().sort().limitFields().paginate();
        let query = await features.query
        //implementing filtering 
        // const allMovies = await Movie.find({duration: req.query.duration*1,ratings:req.query.ratings*1});

        //*For mongoose 6.0 or below*{
        // const excludeFields  = ['sort','page','limit','fields'];

        // const queryObj = {...req.query};//shallow copy using spread operator  ---- for deep copy "const queryObj = req.query" 

        // excludeFields.forEach((el) => {
        //     delete queryObj[el]
        // })

        // console.log(req.query)
        // console.log(queryObj)
       // const allMovies = await Movie.find(queryObj);}

       

        //using mongoose functions
        // const allMovies = await Movie.find(req.query)
        //                         .where('duration')
        //                         .equals(req.query.duration)
        //                         .where('ratings')
        //                         .equals(req.query.ratings)


        // let queryStr = JSON.stringify(req.query);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
        // const queryObj = JSON.parse(queryStr);
        //console.log(queryObj);
        // delete queryObj.sort
        // delete queryObj.fields
        // delete queryObj.page
        // delete queryObj.limit
        // let query =  Movie.find(queryObj);
        //find({duration:{$gte:90},ratings:{$gte:5},price:{$lte:100}})

        //Sorting logic
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ')
        //     //console.log(sortBy)
        //     query = query.sort(sortBy)
        // }
        // else{
        //     query = query.sort('-name')
        // }

        //LIMITING FIELDS
        // if(req.query.fields){
        //     const queryFields = req.query.fields.split(',').join(' ');
        //     query = query.select(queryFields)
        // }
        // else{
        //     query = query.select('-__v')
        // }

        //PAGINATION
        // const page = req.query.page*1 || 1
        // const limit = req.query.limit*1 || 10
        // //page 1 - 1:10 page 2-11:20
        // const skip = (page-1)*limit
        // query = query.skip(skip).limit(limit);

        // if(req.query.page){
        //     const docCount  = await Movie.countDocuments();
        //     if(skip>=docCount)  {
        //         throw new error('This page is not found')
        //     }
        // }

        const allMovies = await query
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
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message: err.message
        })
    }
}


//Aggregation Pipeline
exports.getMovieStats = async (req,res) => {
    try {
        const stats  = await Movie.aggregate([
            { $match : {ratings: {$gt:4.5}}},//stage1 - match
            { $group : {
                _id : '$releaseYear',
                avgRatings : {$avg : '$ratings'},
                avgPrice : {$avg : '$price'},
                minPrice : {$min : '$price'},
                maxPrice : {$max : '$price'},
                totalPrice : {$sum : '$price'},
                movieCount : {$sum : 1}
            }},//stage2 - group 
            { $sort : {minPrice:1}},
            { $match : {maxPrice : {$gte:10}}}
            
        ])
        res.status(201).json({
            status: 'success',
            stats
        })
        
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message: err.message
        })
    }
}


exports.getMovieByGenre = async (req,res)=>{
    try {
        const genre = req.params.genre
        const movies = await Movie.aggregate([
            { $unwind : '$genres'},
            { $match : {genre : genre}},
            { $group : {
                _id : '$genre',
                movieCount : {$sum : 1},
                movies : {$push : 'name'}
            }} ,
            {$addFields : {genre : '_id'}},
            { $project : {_id : 0}},
            { $sort : {movieCount : -1}}
        ])

        res.status(201).json({
            status:'success',
            data : {
                movies
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
    })
    }
}