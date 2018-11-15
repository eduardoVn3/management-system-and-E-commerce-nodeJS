const io = require('.././app');
const db = require('.././config/db.config');
const moment=require('moment')
var helper = require('.././helpers')
var Message = db.Message;
var User = db.User;
var id;

setInterval(function () {
  User.findAll(
      { include: ['Status']}
    ).then(projects => {
      for(var i=0;i<projects.length;i++){

        var start_time=projects[i].dataValues.start_time
        var hora_start=parseInt(start_time.split(':')[0])
        var minuto_start=parseInt(start_time.split(':')[1])

        var end_time=projects[i].dataValues.end_time
        var hora_end=parseInt(end_time.split(':')[0])
        var minuto_end=parseInt(end_time.split(':')[1])

        var fecha_start=new Date(
          year= 2018,
          month=06,
          day=08,
          hours=hora_start,
          minute=minuto_start,
          seconds=00
        )

        var fecha_end=new Date(
          year=2018,
          month=06,
          day=08,
          hours=hora_end,
          minute=minuto_end,
          seconds=00
        )
          if(fecha_end > fecha_start ){



          var end_time=projects[i].dataValues.end_time
          var hora=parseInt(end_time.split(':')[0])
          var minuto=parseInt(end_time.split(':')[1])

           sumatoria_minuto=(hora*60)+minuto

          sumatoria_minuto--

          var new_hour=Math.trunc(sumatoria_minuto/60)
          var new_min=sumatoria_minuto%60
          var finish=new_hour+':'+new_min
          User.update(
            {end_time:finish},
            {
              where:{
                id:projects[i].id
              }
            }
          )

          io.emit('time',finish)
          io.emit('changed-status',{})
          console.log(finish);

        }else{
          // console.log('llego al final de la hora');
        }

      //return res.send(helper.showAll(projects,200))
     }
    });

}, 3000);


setInterval(function () {
  var horaServe=moment().format('hh:mm:ss')
  // console.log(horaServe);
  io.emit('serve-hour',horaServe)
}, 1000);
