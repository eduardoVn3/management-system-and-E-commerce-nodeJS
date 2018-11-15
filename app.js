'use strict'

// HTTP helpers (redirection, caching, etc)
const express = require('express')

const app = express();
//activar api rest
app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

const server = require('http').Server(app);
const io = require('socket.io')(server);
module.exports=io


// Analiza los cuerpos de las solicitudes entrantes
// en un middleware antes que sus manejadores, disponible bajo la propiedad req.body.
const bodyParser = require('body-parser')

const db = require('./config/db.config.js');

var routes = require('./routes'); 


const host = 'localhost'
const port = process.env.PORT || 4000
// const port = process.env.PORT

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())


app.use('/',routes);




require('./config/socket');
 
// force: true will drop the table if it already exists
db.sequelize.sync({
   // force: true
}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

// Servidor
server.listen(port,host,() => {
  console.log(`API REST Corriendo en http://${host}:${port}`);
})

// var fs = require('fs'); var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/node.log', {flags : 'a+'});
// var log_stdout = process.stdout;

// console.log = function(d) { //
//  log_file.write(util.format(d) + '\n');
//  log_stdout.write(util.format(d) + '\n');
// };