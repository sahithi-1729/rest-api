
const { default: mongoose } = require('mongoose');
const fs = require('fs')

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
    },
    createdBy:{
        type: String
    }
},{
    toJSON:{ virtuals:true},
    toObject:{ virtuals:true}
})

movieSchema.virtual('durationInHours').get(function(){
    return this.duration/60
})

//Mongodb middleware - document middleware
//in the document middleware "this" keyword points to the current document
movieSchema.pre('save',function(next){
    this.createdBy = 'Sahithi'
    next()
})

movieSchema.post('save',function(doc,next){
    const content = `This document ${doc.name} has been created by ${doc.createdBy} \n`
    fs.writeFileSync('./Log/log.txt',content,{flag:'a'},(err)=>{
        console.log(err.message)
    })
    next()
})

//MongoDb middleware - query middleware
//in the query middleware "this" keyword points out to the current query obj
movieSchema.pre(/^find/,function(next){
    this.find({releaseDate:{$lte : Date.now()}})//return only released movies
    this.startTime = Date.now();
    next();
})

movieSchema.post(/^find/,function(docs,next){
    
    this.endTime = Date.now();
    const execTime = this.endTime-this.startTime
    const content = `Query took ${execTime} to complete its execution\n`
    fs.writeFileSync('./Log/log.txt',content,{flag:'a'},(err)=>{
        console.log('some error has occured')
    })
    next();
})

//creating a model  movie-model movies-collection  *collection is always plural*
const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie