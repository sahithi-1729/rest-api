
const dotenv = require('dotenv')
//requiring is done only once as it is invoked for the entire process and can be used in any file
dotenv.config({path:'./config.env'})//always above than the app variable

const app = require('./app')
const port = process.env.PORT||3000;

//console.log(app.get('env'));//env is a environment variable by express.js
console.log(process.env)//process is core module of node.js


app.listen(port,()=>{
    console.log("Server is running");
})