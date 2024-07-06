
const { default: mongoose } = require('mongoose');


//creating a schema

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required field'],
        unique:true,
        trim : true
    },
    description : {
        type:String,
        required: true,
        trim: true
    },
    duration : {
        type: Number,
        required: [true,'Duration is required field']
    },
    ratings: {
        type: Number,
        default: 1.0
    },
    totalRatings: {
        type:Number
    },
    releaseYear:{
        type:Number,
        required:true
    },
    releaseDate:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select : false
    },
    genre:{
        type:[String],
        required:true
    },
    directors:{
        type:[String],
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    actors:{
        type:[String],
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},{
    toJSON:{ virtuals:true},
    toObject:{ virtuals:true}
})

movieSchema.virtual('durationInHours').get(function(){
    return this.duration/60
})
//creating a model  movie-model movies-collection  *collection is always plural*
const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie