const db = require('.././config/db.config.js');
var helper = require('.././helpers')
var fieldsValidator = require('fields-validator');
var validateSuggestion = require('.././validator/suggestionValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')

var Suggestion=db.Suggestion

exports.index = (req, res) => {
	Suggestion.findAll(
      { include: ['User']}
    ).then(projects => {
      return res.send(helper.showAll(projects,200))
    });
}

exports.store = function (req,res) {
  console.log('req.body');
  console.log(req.body);
  var data={
    description:req.body.description,
    brand:req.body.brand,
    color:req.body.color,
    // image:req.file.filename,
    image:req.body.image,
    user_id:req.body.user_id,
    email_one:req.body.email_one,
    email_two:req.body.email_two,
    email_three:req.body.email_three,
    email_four:req.body.email_four,
    name_client:req.body.name_client,
    phone:req.body.phone,
    status_id:7,
    shipping_status:'NO ENVIADO'
  }
  Suggestion.create(data).then(created=>{
    Suggestion.findById(
      created.id,
      {include: ['User']}
    ).then(
      (obj) => {
        // console.log(obj)
        return res.send(helper.showOne(obj,200))
      }
    )
  })

}

exports.update = (req,res)=>{

  Suggestion.findById(req.params.id).then(Suggestion=>{
    if(Suggestion == null || Suggestion.length < 0){
      return res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
    }else{

      // VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
      var new_obj_hidden_property = helper.newObjHiddenProperty_2(Suggestion.attributes,configModels.hidden)
      var new_obj_hidden_property = helper.match_value_in_idx(new_obj_hidden_property,req.body)
      var validated = fieldsValidator(validateSuggestion, new_obj_hidden_property);

      if (validated.length > 0) {
        return res.send(response.error(validated,400))
      }
      Suggestion.update(
        new_obj_hidden_property,
        {
          where:{
            id:req.params.id
          }
        }
      ).then( updated =>{
        
        return res.send(helper.showOne(updated,200))
        
      });

    }
  })
}
