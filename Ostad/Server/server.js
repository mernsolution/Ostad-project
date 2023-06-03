require('dotenv').config()
const express = require ("express")
const mongoose = require('mongoose')
const router = require('./Router/Router')
const cors= require('cors')
const mongoSanitize =require('express-mongo-sanitize')
// const expressRateLimit =require('express-rate-limit')
const helmet =require('helmet')
const hpp =require('hpp')
const xssClean =require("xss-clean")
const app = new express()


app.use(express.json({limit:'200mb'}));
app.use(cors());
app.use(mongoSanitize());
// app.use(expressRateLimit());
app.use(helmet());
app.use(hpp());
app.use(xssClean());

async function dataConnection(){
    const URL= process.env.MONGO_CONNECTION
    try {
          await mongoose.connect(URL);
        console.log('successfully connect with mongodb')
    } catch (error) {
       console.log(error) 
    }
}
app.use('/Auth',router)
app.listen(8800,()=>{
dataConnection()
console.log('server is running')
})