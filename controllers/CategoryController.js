'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
var fieldsValidator = require('fields-validator');
var validateSicarProduct = require('.././validator/sicarproductValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')
const sequelize=db.sequelize
var Product=db.ProductsSicar
var Category=db.Category

// FETCH all Users
exports.index = (req, res) => {
	Category.findAll(
  {
    include:[ "ProductsSicar"]
  }
    ).then(projects => {
      return res.send(helper.showAll(projects,200))
    });
}

exports.store = function (req,res) {
  var req_2=req.body.data
  Category.findById(req_2.cat_id).then(sicarcategory=>{
    if(sicarcategory == null || sicarcategory.length < 0){
      var dataSicar={
        id:req_2.cat_id,
        name:req_2.nombre
      }
      Category.create(dataSicar).then(data=>{
        return res.send(response.error('No se ha encontrado el registro con el de la categoria con la id = '+req_2.cat_id+' Pero se han registrado exitosamente',200))
      }).catch(err=>{
        console.log(err)
      })
    }else{
      var dataSicar={
        id:req_2.cat_id,
        name:req_2.nombre
      }
      Category.update(
        dataSicar,
        {
          where:{
            id:req_2.cat_id
          }
        }
      ).then((updated)=>{
        Category.findById(
          req_2.cat_id,
          // {
          //  include: [ 'Status' ]
          // }
        ).then(
          (obj) => {
              return res.send({data:'update  del categoria completado',status:200})
          }
        )
      });
    }
  })
}