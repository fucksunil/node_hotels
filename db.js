const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'//Replace 'mydatabase' with your database name

// Set Up the MongoDB Connection
// mongoose.connect(mongoURL, {
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// })

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

