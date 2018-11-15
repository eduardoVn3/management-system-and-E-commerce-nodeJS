const io = require('.././app');
const Request = require("request");
const db = require('./db.config');
const moment=require('moment');
const moment_timezone = require('moment-timezone');
var gcm = require('node-gcm');
var OneSignal = require('onesignal-node');

var helper = require('.././helpers')
var Message = db.Message;
var User = db.User;
var Category = db.Category;
var ProductsSicar = db.ProductsSicar;
var Suggestion = db.Suggestion;
var Permission = db.Permission;
var EnchangeRate = db.EnchangeRate;

var listUsersConnected = []

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var numUsersConnected = 0;
// hora del primero usuario conectado
var timeUsers = null
var timeUsersAux = null

// create a new Client for a single app
var myClient = new OneSignal.Client({
    userAuthKey: 'OTBiZjdhYjQtNmIxMC00ZGZlLTg0NTQtNzI0NDBhYmQyYTli',
    // note that "app" must have "appAuthKey" and "appId" keys
    app: { appAuthKey: 'NmQ5YzE4MzItYTg3YS00NTM2LTk1NzUtNjMxYjgyNGZiN2Q0', appId: '19ef4620-2b53-4387-9213-c0189f842a73' }
});

io.on('connection', (socket) => {

  console.log('el usuario se conecto:: id ',socket.id);

  // console.log('el usuario se conecto:: cookie ',socket.handshake.cookie);
  setInterval(function () {
    // var horaServe=moment().format('hh:mm:ss')
    var horaServe=moment().tz("Etc/GMT+5").format('HH:mm:ss');
    console.log(horaServe);
    io.emit('serve-hour',horaServe)
  }, 1000);

  // GUARDAR EL TIPO DE CAMBION EN BD Y ENVIAR AL MOVIL
  setInterval( ()=>{
    Request.get("https://www.deperu.com/api/rest/cotizaciondolar.json", (error, response, body) => {
      if(error) {
            EnchangeRate.findById(1).then( data => {
              io.emit('emit_enchangerate',helper.showOne(data,200));
            })
          return console.dir(error);
      }
      if (body == '' || body == null) {
            EnchangeRate.findById(1).then( data => {
              io.emit('emit_enchangerate',helper.showOne(data,200));
            })
        return console.dir(body)
      }
      let obj = JSON.parse(body)
      EnchangeRate.findById(1).then( enchangerate => {
        let updated = {
            site : obj.Sitio,
            service : obj.Servicio,
            buy : obj.Cotizacion[0].Compra,
            sale : obj.Cotizacion[0].Venta
          }

        if (enchangerate == null) {
          EnchangeRate.create(
            updated
          ).then( data => {
            io.emit('emit_enchangerate',helper.showOne(data,200));
          })
        }else{
          EnchangeRate.update(
            updated,
            {
              where:{
                id: 1
              }
            }
          ).then( ()=>{
            EnchangeRate.findById(1).then( data => {
              io.emit('emit_enchangerate',helper.showOne(data,200));
            })
          })

        }

      })


    });
  }, 3600000)

  var sendUsers = setInterval(function () {
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
            if (projects[i].status_id == 2) {
              User.update(
                {status_id:1},
                {
                  where:{
                    id:projects[i].id
                  }
                }
              )

            }

          }

        //return res.send(helper.showAll(projects,200))
       }

       User.findAll(
          { include: ['Status']}
        ).then(projects => {
          io.emit('emit_users',helper.showAll(projects,200));
        });

      });

  }, 60000);


  socket.on('disconnect', function(){

    if (listUsersConnected.length > 0) {
      for (var i = listUsersConnected.length - 1; i >= 0; i--) {
        if (listUsersConnected[i].socketID == socket.id) {
          listUsersConnected.splice(i,1)
        }
      }
    }

    console.log('disconnect, usuario aun conectados : ',listUsersConnected.length);
    // io.emit('users-changed',{user:socket.nickname,event:'left'});
    io.emit('num-users',{numUsers:listUsersConnected.length});
    clearInterval(sendUsers);
  })

  socket.on('reset-nickname',function(){
    if (numUsersConnected > 0) {
      numUsersConnected--;
    }
  })

  socket.on('get-users', function(){
    User.findAll(
      { include: ['Status']}
    ).then(projects => {
      io.emit('emit_users',helper.showAll(projects,200));
    });
  })

  socket.on('changed-category', function(){
    Category.findAll(
    ).then(projects => {
      io.emit('emit_categories',helper.showAll(projects,200));
    });
  })

  socket.on('changed-product', function(obj){
    io.emit('emit_product',obj);
  })

  socket.on('changed-suggestions',()=>{
    Suggestion.findAll(
      // { include: ['Status']}
    ).then(dataResp=>{
      io.emit('emit_suggestions',helper.showAll(dataResp,200))
    })
  })

  socket.on('user-changed',(data)=>{
    User.findById(
      data.id,
      { include: ['Status']}
    ).then(dataResp=>{
      io.emit('info-user',dataResp)
    })
  })

  // socket.on('get-num-users', function(){
  //   console.log('numUsersConnected');
  //   console.log(numUsersConnected);
  //   io.emit('num-users',{numUsers:numUsersConnected});
  // })

  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    numUsersConnected++;

    console.log('users-changed',{user:nickname,event:'joined'});
    io.emit('users-changed',{user:nickname,event:'joined'});
  })

  socket.on('set-user', (obj) => {
    let match = true
    for (let i in listUsersConnected) {
        if (listUsersConnected[i].userID == obj.userID) {
          console.log('El usuario con el ID : '+obj.socketID+' ya esta conectado');
          match = false;
          break;
        }
    }
    if (match) {
      if (obj.socketID == undefined || obj.userID == undefined) {
        console.log('No se puede registrar un usuario sin identificacion');
        return
      }
      console.log('El usuario con el ID : '+obj.socketID+' se ha conectado');
      listUsersConnected.push({
        socketID : obj.socketID,
        userID : obj.userID
      })
    }

    io.emit('num-users',{ numUsers : listUsersConnected.length });
  })
  socket.on('reconnection-user', (obj)=>{
    let status = false
    for (element of listUsersConnected) {
      if (element.userID == obj.userID && element.socketID == obj.socketID) {
        console.log('Se esta intentando reconectar sin haber sido desconectado');
        status = true
      }
      if (element.userID == obj.userID) {
        element.socketID == obj.socketID
        console.log('Se ha actualizado el token, reconeccion exitosa con ID : '+obj.userID);
        status = true
      }
    }
    if (!status) {
      // hay usuario para reconectar pero la lista de usuarios esta vacia
      listUsersConnected.push(obj)
      console.log('Se ha reconectado al usuario con el ID : '+obj.userID+' FORZOSAMENTE');
    }
    io.emit('num-users',{ numUsers : listUsersConnected.length });
  })

  socket.on('message-not-read', (user) => {
    console.log('message-not-read',user.id,user.name);
    let idxFirstMessageNotRead = -1;

    Message.findAll(
    // {
    //   where: {
    //     [Op.gt]:
    //   }
    // }
    {
      include: ['User']
    }
    ).then( messages => {


      for( var message of messages ){
        if (message.num_users_read == null) {
          continue;
        }
        let listUsers = JSON.parse(message.num_users_read)

        if (listUsers.indexOf(user.id) == -1) {
          // if (idxFirstMessageNotRead == -1) {
          //   idxFirstMessageNotRead = message.id
          // }
          console.log('emit-messages',message.id,message.details);
          // io.emit('emit-messages-not-read',{user_id: user.id, message:message })
        }
      }


    })

    // console.log('idxFirstMessageNotRead',idxFirstMessageNotRead);
    //   if (idxFirstMessageNotRead != -1) {
    //     Message.findAll(
    //       {
    //         where: {
    //           [Op.gte]: idxFirstMessageNotRead
    //         }
    //       }
    //     ).then( msgs => {
    //       io.emit('emit-messages-not-read-all',{user_id: user.id,messages:msgs})
    //     })
    //   }


  })

  socket.on('reconnect-nickname', (nickname) => {
    socket.nickname = nickname;
    console.log('user-reconnect');
  })

  socket.on('get-old-messages', (obj) => {
    // NumRecords
    // message_id
    console.log('.........');
    console.log(obj);

    Message.findAll(
      {
      limit: obj.NumRecords,
      order: [

          ['id', 'DESC']
        ],
      offset: obj.offset,
      include: ['User']
      }
    ).then(
      messages => {
      console.log(messages);
      io.emit('emit-old-messages', {user_id: obj.user_id, messages: messages});
    })
  })

  socket.on('get-old-messages-greater-id', (obj) => {

    Message.findAll(
      {
        include: ['User'],
        where: {
          id: {
            [Op.gte]: obj.id
          }
        }
      }
    ).then(
      messages => {
      io.emit('filter-messages', messages);
    })
  })

  socket.on('add-message', (obj) => {
    // console.log('message------------');
    // console.log(obj);

    Message.create({
      details: obj.details,
      user_id: obj.user_id,
      num_users_read: obj.num_users_read,
      channel_id: obj.channel_id
    }).then(createData=>{
      Message.findById(
        createData.id,
        {include: ['User']}
      ).then(
        (obj) => {
          // console.log(obj)
          io.emit('emit-message', obj);

          // contents is REQUIRED unless content_available=true or template_id is set.
          var firstNotification = new OneSignal.Notification({
              contents: {
                  en: "Mensage de Celpartes",
                  tr: "Tiene un Nuevo Mensaje..."
              }
          });

          // set notification parameters
          obj.User.avatar = 'Se cambio en el api para las notificaciones'
          let newObj =  JSON.stringify(obj)
          newObj = JSON.parse(newObj)
          console.log('dasdsa',newObj);
          firstNotification.setParameter('data', newObj);

          // set target users
          firstNotification.setIncludedSegments(['All']);
          firstNotification.setExcludedSegments(['Inactive Users']);

          // send this notification to All Users except Inactive ones
          myClient.sendNotification(firstNotification, function (err, httpResponse,data) {
             if (err) {
                 console.log('Something went wrong...');
             } else {
                 console.log(data, httpResponse.statusCode);
             }
          });


        }
      )
    })
  })
  socket.on('update-message', (message) => {

    Message.update({
        details : message.details,
        num_users_read : message.num_users_read,
        user_id : message.user_id,
        channel_id : message.channel_id
      },
      {
        where: {
          id: message.id
        }
      }
    )
  })


  socket.on('get-permissions', ()=>{

    Permission.findAll(
      {
        include: ['FeatureSystem']
      }
    ).then( (permissions)=> {
      io.emit('emit-permissions',helper.showAll(permissions,200))
    })

  })

  socket.on('get-permissions-user', (id)=>{

    Permission.findAll(
      {
        include: ['FeatureSystem'],
        where: {
        	user_id: id
        }
      }
      ).then( permissions => {

        io.emit('emit-permissions-user',helper.showAll(permissions,200))

      });

  })



  //cambio de status del usuario
  socket.on('status-change-user',(data)=>{
    console.log(data);
    var start_time=moment().format('hh:mm');
    var hour=parseInt(data.time.hora)
    var minuto=parseInt(data.time.minuto)
    console.log('hour',hour);
    console.log('minuto',minuto);
    console.log('start_time',start_time);
    var min=hour*60
    min=min+minuto
    console.log(min)
    var end_time=moment().add(min, 'minutes').format('hh:mm');
    console.log('end_time',end_time);
       User.update(
         {
         status_id:data.status_id,
         start_time:start_time,
         end_time:end_time,
         description_status:data.time.descripcion
       },
         {where:{
           id:data.id
         }
       }).then(userUp=>{
         User.findById(
            data.id,
            {include: ['Status']}
          ).then(obj=>{
           // io.emit('changed-status',{})
           io.emit('info-user',helper.showOne(obj,200))
           User.findAll({ include: ['Status']}).then( users => {
            io.emit('emit_users',helper.showAll(users,200))
           })
         })
       })
    })//fin

})
