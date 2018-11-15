'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
const bcrypt = require('bcryptjs');
const moment = require('moment');
var fieldsValidator = require('fields-validator');
var validateEmployee = require('.././validator/employeeValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')

var User = db.User;

// FETCH all Users
exports.index = (req, res) => {
	User.findAll(
      { include: ['Status']}
    ).then(projects => {
      return res.send(helper.showAll(projects,200))
    });
}

exports.store = function (req,res) {

	// VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
	var new_obj_hidden_property = helper.newObjHiddenProperty(User.attributes,configModels.hidden)
	var new_obj_hidden_property = helper.match_value_in_idx(new_obj_hidden_property,req.body)

	var validated = fieldsValidator(validateEmployee, new_obj_hidden_property);

	if (validated.length > 0) {
		return res.send(response.error(validated,400))
	}

	User.findOne(
		{
			include: ['Status'],
			where:{
				email:req.body.email,
				// nickname:req.body.nickname,
				//password:req.body.password
			}
		}
	).then(user=>{
		if(user != null){
			return res.send(response.error('El email ya esta en uso',404));
		}else{
			User.findOne(
				{
					include: ['Status'],
					where:{
						email:req.body.email,
						// nickname:req.body.nickname,
						//password:req.body.password
					}
				}
			).then(user=>{
				if(user != null){
					return res.send(response.error('El nickname ya esta en uso',404));
				}else{
					var encript=bcrypt.genSaltSync(10);
					var passwordEncript=bcrypt.hashSync(req.body.password,encript);
					req.body.password=passwordEncript
					req.body.type_employee='default'
					req.body.status_id=1
					req.body.avatar='person (2).svg'

					User.create(req.body).then(created=>{
						User.findById(
							created.id,
							{include: ['Status']}
						).then(
							(obj) => {
								console.log(obj)
								return res.send(helper.showOne(helpers.hiddenProperty(obj, configModels.private),200))
							}
						)

					})

				}

	    })
	  }
	})

}


exports.show = function (req,res) {
	User.findOne({
		include: ['Status'],
		where:{
			id: req.params.id
		}
	}).then(user=>{
		return  res.send(helper.showOne(user,'200'))
	})
}

exports.delete = function(req,res) {
	User.findById(req.params.id).then( user => {
		if (user == null || user.length <= 0) {
			return  res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{
			User.destroy({
				where: { id: req.params.id }
			}).then(() => {
				return res.send(response.success('Se ha eliminado el registro con id = ' + req.params.id));
			});
		}

	})
}

exports.login = function (req,res) {

	// VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
	var validated = fieldsValidator(validateEmployee,helper.match_value_in_idx({nickname:'',password:''}, req.query));

	if (validated.length > 0) {
		return res.send(response.error(validated,400))
	}

	User.findOne({
		include: ['Status'],
		where:{
			nickname:req.query.nickname
		}
	}).then(user=>{
		if (user == null) {
			return res.send(response.error('No se encuentran coincidencias',401))
		}
		let usr = user.dataValues;
		if(bcrypt.compareSync(req.query.password,usr.password)){
			//return res.send(helper.showHidden(usr,200))
			return res.send(helper.showOne(helper.hiddenProperty(usr,configModels.private),200))
		}else{
			return res.send(response.error('Contraseña incorrecta',401))
		}
	})

}

exports.update = (req,res)=>{

	User.findById(req.params.id).then(user=>{
		if(user == null || user.length < 0){
			return res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{

			// VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
			var validated = fieldsValidator(validateEmployee, req.body);
			var field_a_Updated = helper.matchObjs(User.attributes,req.body);

			if (validated.length > 0) {
				return res.send(response.error(validated,400))
			}
			if (field_a_Updated.hasOwnProperty('password')) {
				var encript=bcrypt.genSaltSync(10);
				var passwordEncript=bcrypt.hashSync(field_a_Updated.password,encript);
				field_a_Updated.password = passwordEncript
			}
			User.update(
				field_a_Updated,
				{
					where:{
						id:req.params.id
					}
				}
			).then((updated)=>{
				User.findById(
					req.params.id,
					{
						include: [ 'Status' ]
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
