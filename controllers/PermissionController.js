const db = require('.././config/db.config.js');
var helper = require('.././helpers')
var fieldsValidator = require('fields-validator');
// var validateSuggestion = require('.././validator/suggestionValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')

var Permission = db.Permission

exports.index = (req, res) => {
	Permission.findAll(
    { 
      include: ['FeatureSystem']
    }
    ).then( permissions => {

      return res.send(helper.showAll( permissions,200 ))

    });
}

exports.show = function (req,res) {
	Permission.findAll(
    { 
      include: ['FeatureSystem'],
      where: {
      	id: req.params.id
      }
    }
    ).then( permissions => {

      return res.send(helper.showAll( permissions,200 ))

    });
}

exports.update = (req,res)=>{

  Permission.findById(req.params.id).then( permission =>{

    if(permission == null || permission.length < 0){
      return res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
    }else{

      // VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
      // var validated = fieldsValidator(validateEmployee, req.body);
      // var field_a_Updated = helper.matchObjs(User.attributes,req.body);
      var field_a_Updated = req.body;

      // if (validated.length > 0) {
      //   return res.send(response.error(validated,400))
      // }
      // if (field_a_Updated.hasOwnProperty('password')) {
      //   var encript=bcrypt.genSaltSync(10);
      //   var passwordEncript=bcrypt.hashSync(field_a_Updated.password,encript);
      //   field_a_Updated.password = passwordEncript
      // }
      console.log('field_a_Updated',field_a_Updated)
      Permission.update(
        field_a_Updated,
        {
          where:{
            id:req.params.id
          }
        }
      ).then( (updated) =>{
        Permission.findById(
          req.params.id,
          {
            include: [ 'FeatureSystem' ]
          }
        ).then(
          (obj) => {
              return res.send(helper.showOne(obj,200))
          }
        )
      });

    }
  })
}
