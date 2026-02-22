const  dotenv = require( 'dotenv')
dotenv.config();
const cors = require('cors')
const express = require('express')
const connectToDb  = require('./db/db')

const app = express();

connectToDb();

app.use(cors());

app.get('/',(req,res)=>{
    console.log("just casual route for testing")
})

module.exports = app;