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
const userRoute = require('./routes/user.js');
const commentRoute = require('./routes/comment.js');

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
app.use('/api/comment', commentRoute);



//Database connection
connectMongo(process.env.DB_URL).then(()=>{
    console.log("Database Connected Successfully.");
}).catch((err)=>{
    console.log("Database Connection Failed..", err);
})



app.listen(process.env.PORT, ()=>{
    console.log(`server started at Port ${process.env.PORT}`);
})



