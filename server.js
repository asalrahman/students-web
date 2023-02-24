require('dotenv').config();
var express = require('express');
var mongoose = require ('mongoose');
var session = require("express-session")

var app = express();
var PORT = process.env.PORT || 8000;


 
//db connection 
// const dbConnection = require("./db");

mongoose.connect(process.env.DB_URI,{useNewUrlParser:true ,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',(error)=> console.log('error'));
db.once('open',()=> console.log('connected to db'));


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
     
    })
  );

  app.use('',require('./routes/routes'))


 app.set('view engine', 'ejs');





app.listen(PORT ,()=>{
    console.log(`Listening on http://localhost:${PORT}`)});