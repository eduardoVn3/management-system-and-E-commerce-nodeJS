var db = require('.././models');
  console.log("Ingrese comando");
  var stdin = process.openStdin();
var commands=['--run-default  ---------->Crear data por defecto en las tablas',
              '--help ---------->Ver todos los comandos disponibles']
  stdin.addListener("data", function(d) {
    var string=d.toString().trim()
    console.log("comando: ",string);
    if(string === '--help'){
      for(var i=0;i<commands.length;i++){
        console.log(commands[i]);
      }
    }else if(string === '--run-default'){
      status=['DISPONIBLE','NO DISPONIBLE']
      channel=['general','grupo_1']
      for(var i=0;i<status.length;i++){
        var dataStatus={
          name:status[i]
        }
        var dataChannel={
          name:channel[i]
        }
        db.status.create(dataStatus).then(create =>{
          console.log("se ha creado "+create.name);
        })
        db.channels.create(dataChannel).then(create =>{
          console.log("se ha creado "+create.name);
        })
      }
    }else{
      console.log('ingrese el comando --help para ver todos los comandos');
    }
  });
