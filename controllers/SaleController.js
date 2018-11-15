'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
const bcrypt = require('bcryptjs');
const moment = require('moment');
var fieldsValidator = require('fields-validator');
var validateSale = require('.././validator/saleValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')

var Sale=db.Sale

exports.index = (req,res)=>{
	Sale.findAll(
    ).then(projects => {
      return res.send(helper.showAll(projects,200))
    });
}

// exports.store = (req, res)=>{
// 	console.log(req.body)
// 	// var new_obj_hidden_property = helper.newObjHiddenProperty(Client.attributes,configModels.hidden)
// 	// var new_obj_hidden_property = helper.match_value_in_idx(new_obj_hidden_property,req.body)

// 	var validated = fieldsValidator(validateSale, req.body);

// 	if (validated.length > 0) {
// 		return res.send(response.error(validated,400))
// 	}


// }

exports.update = (req,res)=>{
	Sale.findById(req.params.id).then(sale=>{
		if(sale == null || sale.length < 0){
			return res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{

			// VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
			var validated = fieldsValidator(validateSale, req.body);
			var field_a_Updated = helper.matchObjs(Sale.attributes,req.body);

			if (validated.length > 0) {
				return res.send(response.error(validated,400))
			}
			
			Sale.update(
				field_a_Updated,
				{
					where:{
						id:req.params.id
					}
				}
			).then((updated)=>{
				Sale.findById(
					req.params.id,
					
				).then(
					(obj) => {
							return res.send(helper.showOne(obj,200))
					}
				)
			});

		}
	})
}