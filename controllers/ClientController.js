'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
const bcrypt = require('bcryptjs');
const moment = require('moment');
var fieldsValidator = require('fields-validator');
var validateClient = require('.././validator/clientValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')

var Client=db.Client

exports.index = (req,res)=>{
	Client.findAll(
    ).then(projects => {
      return res.send(helper.showAll(projects,200))
    });
}
exports.store = (req, res)=>{
	console.log(req.body)
	// var new_obj_hidden_property = helper.newObjHiddenProperty(Client.attributes,configModels.hidden)
	// var new_obj_hidden_property = helper.match_value_in_idx(new_obj_hidden_property,req.body)

	var validated = fieldsValidator(validateClient, req.body);

	if (validated.length > 0) {
		return res.send(response.error(validated,400))
	}

	Client.findOne(
		{
			where:{
				email:req.body.email,
				// nickname:req.body.nickname,
				//password:req.body.password
			}
		}
	).then(Client_find=>{
		if(Client_find != null){
			return res.send(response.error('El email ya esta en uso',404));
		}else{
			Client.findOne(
				{
					where:{
						// email:req.body.email,
						nickname:req.body.nickname,
						//password:req.body.password
					}
				}
			).then(Client_find=>{
				if(Client_find != null){
					return res.send(response.error('El nickname ya esta en uso',404));
				}else{
					var encript=bcrypt.genSaltSync(10);
					var passwordEncript=bcrypt.hashSync(req.body.password,encript);
					req.body.password=passwordEncript
					// req.body.type_employee='default'
					// req.body.status_id=1
					req.body.avatar='person (2).svg'

					Client.create(req.body).then(created=>{
						Client.findById(
							created.id,
						).then(
							(obj) => {
								console.log(obj)
								let usr = obj.dataValues;
								return res.send(helper.showOne(helper.hiddenProperty(usr, configModels.private),200))
							}
						)

					})

				}

	    })
	  }
	})
}
exports.show = (req,res)=>{
	Client.findOne({
		where:{
			id: req.params.id
		}
	}).then(Client=>{
		return  res.send(helper.showOne(Client,'200'))
	})
}

exports.delete = (req,res)=>{
	Client.findById(req.params.id).then( client => {
		if (client == null || client.length <= 0) {
			return  res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{
			Client.destroy({
				where: { id: req.params.id }
			}).then(() => {
				return res.send(response.success('Se ha eliminado el registro con id = ' + req.params.id));
			});
		}

	})
}

exports.login = function (req,res) {
	// VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
	var validated = fieldsValidator(validateClient,helper.match_value_in_idx({nickname:'',password:''}, req.query));

	if (validated.length > 0) {
		return res.send(response.error(validated,400))
	}

	Client.findOne({
		where:{
			nickname:req.query.nickname
		}
	}).then(client=>{
		if (client == null) {
			return res.send(response.error('No se encuentran coincidencias',401))
		}
		let usr = client.dataValues;
		if(bcrypt.compareSync(req.query.password,usr.password)){
			//return res.send(helper.showHidden(usr,200))
			return res.send(helper.showOne(helper.hiddenProperty(usr,configModels.private),200))
		}else{
			return res.send(response.error('Contraseña incorrecta',401))
		}
	})
}

exports.update = (req,res)=>{
	Client.findById(req.params.id).then(client=>{
		if(client == null || client.length < 0){
			return res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{

			// VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
			var validated = fieldsValidator(validateClient, req.body);
			var field_a_Updated = helper.matchObjs(Client.attributes,req.body);

			if (validated.length > 0) {
				return res.send(response.error(validated,400))
			}
			if (field_a_Updated.hasOwnProperty('password')) {
				var encript=bcrypt.genSaltSync(10);
				var passwordEncript=bcrypt.hashSync(field_a_Updated.password,encript);
				field_a_Updated.password = passwordEncript
			}
			Client.update(
				field_a_Updated,
				{
					where:{
						id:req.params.id
					}
				}
			).then((updated)=>{
				Client.findById(
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