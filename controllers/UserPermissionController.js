const db = require('.././config/db.config.js');
var helper = require('.././helpers')
var fieldsValidator = require('fields-validator');
// var validateSuggestion = require('.././validator/suggestionValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')

var Permission = db.Permission


exports.show = function (req,res) {
	Permission.findAll(
    { 
      include: ['FeatureSystem'],
      where: {
      	user_id: req.params.id
      }
    }
    ).then( permissions => {

      return res.send(helper.showAll( permissions,200 ))

    });
}
