'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
var fieldsValidator = require('fields-validator');
var validateSicarProduct = require('.././validator/sicarproductValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')
const moment = require('moment');
var date=moment().format('YYMMDD')
var hour=moment().format('hmm')

var Property=db.Property

exports.store = (req,res)=>{
	if (req.body.code == undefined || req.body.section == undefined || req.body.label == undefined) {
		return res.send(response.error('No se enviaron algunos parametros'))
	}
	let obj = []
	new Promise( (resolve,reject)=>{
		let aux = 0
		if (req.files.length == 0) {
			return res.send(response.error('No arhivos a guardar'));
		}
		for(var i=0;i<req.files.length;i++){
			Property.create({
				code:req.body.code,
				section:req.body.section,
				label:req.body.label,
				value:date+hour+'_'+req.files[i].originalname
			}).then(result=>{
				obj.push(result)
				console.log('aux == req.files.length-1',aux == req.files.length-1);
				if (aux == req.files.length-1) {
					resolve()
				}
			})
		}

	}).then( ()=>{
		return res.send(helper.showAll(obj,200));
	})

}

exports.show = (req,res)=>{
		let condition = {
			code: req.query.code
		}
		if (req.query.section != undefined) {
			Object.defineProperty(condition,'section',{
			  writable: true,
			  enumerable: true,
			  configurable: true,
			  value: req.query.section
			})
		}
		if (req.query.label != undefined) {
			Object.defineProperty(condition,'label',{
			  writable: true,
			  enumerable: true,
			  configurable: true,
			  value: req.query.label
			})
		}
		console.log('condition',condition);
	  Property.findAll(
      {
        where: condition
      }
    ).then(
          (obj) => {
              return res.send(helper.showAll(obj,200))
          }
    )
}

exports.update= (req, res) => {
  let imageArray='';
  // for(var i=0;i<req.files.length;i++){
  //   imageArray=imageArray+date+hour+'_'+req.files[i].originalname+';'
  // }
  console.log('files: ',req);
  return res.send('dsad')
  // Property.update(
  //   {
  //     value:imageArray
  //   },{
  //   where:{
  //     code: req.code,
  //     section: req.section,
  //     label: req.label
  //   }
  // })
  // .then( property => {
  //   Property.findOne({
  //     where: {
  //       code: req.code,
  //       section: req.section
  //     }
  //   }).then( obj => {
  //     return res.send( helper.showOne(obj,200))
  //   })
  //
  // }).catch(err=>{
  //   console.log('Error obtener la propiedad despues de actualizar',JSON.stringify(err))
  // })
}

exports.delete = (req, res) => {
	Property.findById(req.params.id).then( property => {
		if (property == null || property.length <= 0) {
			return  res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{
			Property.destroy({
				where: { id: req.params.id }
			}).then(() => {
				return res.send(response.success('Se ha eliminado el registro con id = ' + req.params.id));
			});
		}

	})
}
