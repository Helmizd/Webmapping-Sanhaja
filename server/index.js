const express = require('express');
const path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const routes = require('./database/routers/index.js');

var app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname,'..','public','www')))

app.use('/users', routes.user);
app.use('/reclamation', routes.reclamation);
app.use('/intervention', routes.inter);

app.listen(3001,()=>{
    console.log('Listen on 3001 port')
})