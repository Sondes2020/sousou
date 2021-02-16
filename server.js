// require express
const express=require("express");
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')


1// require connectDB
const connectDB=require("./config/connectDB");
// require router
const authRouter=require("./routes/user");
const profileRouter=require("./routes/profile");
const serviceRouter=require("./routes/service");
const articleRouter=require("./routes/article");
const imageRouter=require("./routes/article");



//connectDB
connectDB();
2//init express
const app=express();
//middlleware
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
// use router
app.use('/api/auth', authRouter);
app.use('/api/auth', profileRouter);
app.use('/api/auth', serviceRouter);
app.use('/api/auth', articleRouter);
app.use('/api/auth', imageRouter); 



app.use('/productImage', express.static('upload'));




3// create port
const port = process.env.PORT || 5000;
4// lunch server
app.listen(port, (error)=> error
? console.log(error)
:console.log(`The server is running on port ${port}`)
);
