// require('dotenv').config()

const mongoose=require('mongoose');

const mongoURL="mongodb://127.0.0.1:27017/Programing_API's"
// Define the MongoDb connection URL 

// const mongoURL = process.env.MONGODB_URI;

mongoose.connect ( mongoURL, {
//    useNewUrlParser:true,
//     useUnifiedTopology:true
}) 

// connection for database connection

const db = mongoose.connection;

// Event Listner for  Database Connection   

db.on('connected',()=>{
    console.log('Connected to MongoDb Server');
});
db.on('error',(err)=>{
    console.error('MongoDb connection to error:'.err);
});
db.on('disconnected',()=>{
    console.log('MongoDb disconnected');
});

// Export the database connection 