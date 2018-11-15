'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
const moment = require('moment');
var response = require('.././helpers/response')
var configModels = require('.././config/models')
var fieldsValidator = require('fields-validator');
var validateScore = require('.././validator/scoreValidation.js');
const Op = db.Sequelize.Op
var Score=db.Score;

exports.index = (req, res) => {
	var validated = fieldsValidator(validateScore, req.body);


	if (validated.length > 0) {
		return res.send(response.error(validated,400))
	}
	var init=req.body.date_init
	var finish_date=req.body.date_finish
	Score.findAll({
		include: [db.ProductsSicar,db.User],
		where:{
			user_id:req.params.user_id,
		}
	}).then(score=>{
		var finish=[];
		var promise=new Promise((result,reject)=>{
			for(var i=0;i<score.length;i++){
				console.log('mommm',moment(score[i].date_made).isBetween(req.body.date_init,req.body.date_finish));
				if(moment(score[i].date_made).isBetween(req.body.date_init,req.body.date_finish) ){
					finish.push(score[i])
					// console.log(score[i].date_made+' es true')
				}else{
					// console.log(score[i].date_made+' es false')
				}
			}
			result()
		})
		promise.then(()=>{
			return res.send(helper.showAll(finish,'200'))
		})
	})
}


exports.store = function (req,res) {
	var data_score={
		user_id:req.body.user_id,
		product_id:req.body.product_id,
		date_made:req.body.date_made,
		type_service:req.body.type_service,
	}
	var validated = fieldsValidator(validateScore, data_score);


	if (validated.length > 0) {
		return res.send(response.error(validated,400))
	}

	Score.create(data_score).then(result=>{
		return res.send(response.success('registro con exito'))
	}).catch(err=>{
		console.log(err)
		return res.send(response.error('error no se ha podido registrar'))
	})
}

exports.show = function (req,res) {
	var validated = fieldsValidator(validateScore, req.body);


	if (validated.length > 0) {
		return res.send(response.error(validated,400))
	}
	Score.findAll({
		include: [db.ProductsSicar,db.User],
		where:{
			user_id: req.params.user_id,
			date_made:req.body.date_select
		}
	}).then(score=>{
		return res.send(helper.showOne(score,'200'))
	})
}

exports.delete = function(req,res) {
	Score.findById(req.params.id).then( user => {
		if (user == null || user.length <= 0) {
			return  res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{
			Score.destroy({
				where: { id: req.params.id }
			}).then(() => {
				return res.send(response.success({data:'Se ha eliminado el registro con id = ' + req.params.id}));
			});
		}

	})
}

exports.available_dates = function (req,res) {
	// return res.send(db.sequelize.query('select distinct year(date_made),month(date_made) from scores '))
	db.sequelize.query(
		"select distinct year(date_made) as year,month(date_made) as month from scores",
		{ type: db.sequelize.QueryTypes.SELECT}
	).then( results => {
		if (results.length > 0) {
	  		return res.send(response.success(results))
		}else{
			return res.send(response.error('No se han encontrado coincidencias'))
		}
	})

}
