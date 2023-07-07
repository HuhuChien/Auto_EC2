require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const port = 5020
const cookieParser = require("cookie-parser");
const ec2 = require('./02_routes/ec2');


//PART1
//以下設定關於讓browser接收cookie
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

//PART2
app.use(express.json()); // Without `express.json()`, `req.body` is undefined. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.urlencoded({extended:false}))//is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.static(__dirname + '/front-end' + '/public'))
app.use(cookieParser());


//PART3
//Mount routers
app.use(ec2);



const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Create_EC2')
        await console.log('database is connected successfully');
        await app.listen(port, () => console.log(`server is runningg on port ${port}`));
    } catch(error) {
        await console.log('failed')
        await console.log(error)
    }
}


connectDB()





