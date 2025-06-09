const express = require("express");
require('dotenv').config();

const connectMongo = require('./connectDB.js')

const cors = require("cors");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Import Routes
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js');

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.get('/', (req, res)=>{
    res.json({name: "Ayushman", email: "ayushman123@gamil.com", password: "12345"});
})


//Database connection
connectMongo(process.env.DB_URL).then(()=>{
    console.log("Database Connected Successfully.");
}).catch((err)=>{
    console.log("Database Connection Failed..", err);
})



app.listen(process.env.PORT, ()=>{
    console.log("server started at Port 8000");
})



