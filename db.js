const mongoose = require('mongoose');
require('dotenv').config()

//Define the MongoDB connection URL
// const mongoURL = process.env.MongoDB_URL_LOCAL
const mongoURL = process.env.MongoDB_URL

mongoose.connect(mongoURL)


//get Default Connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define event listeners for database connection
db.on('connected', ()=> {
    console.log('connected to MongoDB server')
})


db.on('error', (err)=> {
    console.log('MongoDB conncetion error: ', err)
})

db.on('disconnected', ()=> {
    console.log('MongoDB disconnected')
})

// Export the database connection
module.exports = db;

