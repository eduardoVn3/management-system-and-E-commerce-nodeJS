const io = require('.././app');
var db = require('.././models');
var helper = require('.././helpers')
var response = require('.././helpers/response')
 io.on('connect',(socket)=>{
   socket.on('status-change',(data)=>{
       db.employees.update(
         {id_status:data.id_status},
         {where:{
           id:data.id_employees
         }
       }).then(userUp=>{
         console.log(userUp);
          io.emit('status-change','true')
       })
    })
 })
