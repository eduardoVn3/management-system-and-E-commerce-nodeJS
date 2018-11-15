'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
var fieldsValidator = require('fields-validator');
var validateSicarProduct = require('.././validator/sicarproductValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')
var sequelize=db.sequelize
var SicarProduct=db.ProductsSicar
var Categories=db.Category

const moment = require('moment');
var date=moment().format('YYMMDD')
var hour=moment().format('hmm')

// FETCH all Users
exports.index = (req, res) => {
	SicarProduct.findAll(
    ).then(projects => {
			console.log('req.query',req.query);
      return res.send(helper.showAll(projects,200,req.query))
    })
}

exports.update = (req,res)=>{

	SicarProduct.findById(req.params.id).then(sicarproduct=>{
		if(sicarproduct == null || sicarproduct.length <= 0){
			return res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{

			// VALIDAR LOS CAMPOS QUE VAN A HACER UPDATE
			var validated = fieldsValidator(validateSicarProduct, req.body);
			if (validated.length > 0) {
				return res.send(response.error(validated,400))
			}
			// CREAMOS UN NEW OBJ PROPIOS DEL MODELO CON CAMPOS QUE NO DEBERIAN DE ACTUALIZAR
			var new_obj_hidden_property = helper.newObjHiddenProperty(SicarProduct.attributes,configModels.hidden)

			// IGUALAMOS LOS VALORES EN EL NEW OBJ CON LOS VALORES DE REQ.BODY
			new_obj_hidden_property = helper.match_value_in_idx(new_obj_hidden_property,req.body)

			// CREAMOS OTRO NEW OBJ CON LOS CAMPOS QUE SI VAN A HACER UPDATE
			new_obj_hidden_property = helper.cleanFieldsNulls(new_obj_hidden_property)


			console.log('req.body',req.body);
			console.log('new_obj_hidden_property',new_obj_hidden_property);

			console.log('field_a_Updated',new_obj_hidden_property);

			SicarProduct.update(
				new_obj_hidden_property,
				{
					where:{
						id:req.params.id
					}
				}
			).then((updated)=>{
				SicarProduct.findById(
					req.params.id,
					// {
					// 	include: [ 'Status' ]
					// }
				).then(
					(obj) => {
							return res.send(helper.showOne(obj,200))
					}
				)
			})

		}
	})
}

exports.store = function (req,res) {
  var req_2=req.body.data
  var validated = fieldsValidator(validateSicarProduct, req_2);


  if (validated.length > 0) {
    return res.send(response.error(validated,400))
  }
  SicarProduct.findById(req_2.art_id).then(sicarcategory=>{
    if(sicarcategory == null || sicarcategory.length < 0){
      var fields={
        id:req_2.art_id,
        clave:req_2.clave,
        clave_alt:req_2.claveAlterna,
        description:req_2.descripcion,
        purchase_price:parseFloat(req_2.precioCompra).toFixed(2),
        sale_price:parseFloat(req_2.precio1).toFixed(2),
        stock:req_2.existencia,
	      stock_1:req_2.existencia,
        weigth:'',
        characteristic:'',
        category_id:req_2.cat_id,
      }
      SicarProduct.create(fields).then(data=>{
        return res.send(response.success('se ha registrado el producto con el id = '+ req_2.art_id +' exitosamente',200))
      })
    }else {
    	return res.send(response.error('El registrado con el id = '+ req_2.art_id +' ya existe'))
    }
  })
}

exports.UpdateAll = function (req,res) {
  var req_2=req.body.data
  SicarProduct.findById(req_2.art_id).then(sicarcategory=>{
    let fields = null
    if (req_2.section == 'ALMACEN') {
      fields = {
        id:req_2.art_id,
        clave:req_2.clave,
        clave_alt:req_2.claveAlterna,
        description:req_2.descripcion,
        purchase_price:parseFloat(req_2.precioCompra).toFixed(2),
        sale_price:parseFloat(req_2.precio1).toFixed(2),
        stock_1:req_2.existencia,
        weigth:'',
        characteristic:'',
        category_id:req_2.cat_id,
      }
    }
    if (req_2.section == '4B') {
      fields = {
        id:req_2.art_id,
        clave:req_2.clave,
        clave_alt:req_2.claveAlterna,
        description:req_2.descripcion,
        purchase_price:parseFloat(req_2.precioCompra).toFixed(2),
        sale_price:parseFloat(req_2.precio1).toFixed(2),
        stock_2:req_2.existencia,
        weigth:'',
        characteristic:'',
        category_id:req_2.cat_id,
      }
    }
    if (req_2.section == 'F17-G16') {
      fields = {
        id:req_2.art_id,
        clave:req_2.clave,
        clave_alt:req_2.claveAlterna,
        description:req_2.descripcion,
        purchase_price:parseFloat(req_2.precioCompra).toFixed(2),
        sale_price:parseFloat(req_2.precio1).toFixed(2),
        stock_3:req_2.existencia,
        weigth:'',
        characteristic:'',
        category_id:req_2.cat_id,
      }
    }
    SicarProduct.update(
        fields,
        {
          where:{
            id:req_2.art_id
          }
        }
      ).then((updated)=>{
        return res.send(response.success_message('update  del producto: '+ req_2.art_id +' completado'))
      })
  })
}

// exports.UpdateAll = function (req,res) {
//   var req_2=req.body.data
//   SicarProduct.findAll({
//     where:{
//       clave:req_2.clave
//     }
//   }).then(sicarcategory=>{
//     let fields = null
//     if (req_2.section == 'ALMACEN') {
//       fields = {
//         clave:req_2.clave,
//         clave_alt:req_2.claveAlterna,
//         score_sale:req_2.score_sale,
//         score_service:req_2.score_service,
//       }
//     }
//     SicarProduct.update(
//         fields,
//         {
//           where:{
//             clave:req_2.clave
//           }
//         }
//       ).then((updated)=>{
//         return res.send(response.success('update  del producto: '+ req_2.clave +' completado'))
//       });
//   })
// }


exports.upload_image = function (req,res) {

	SicarProduct.findById(req.params.id).then(sicarproduct=>{
		if(sicarproduct == null || sicarproduct.length <= 0){
			return res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{

			let listImages = []
			if (sicarproduct.image != null && sicarproduct.image.length > 1) {
				listImages = JSON.parse(sicarproduct.image)
			}else {
			}
			for(var i=0;i<req.files.length;i++){
				listImages.push(date+hour+'_'+req.files[i].originalname)
			}

			SicarProduct.update(
				{
					image : JSON.stringify(listImages)
				},
				{
					where:{
						id : req.params.id
					}
				}
			).then((updated)=>{
				console.log('updated product',updated);
				SicarProduct.findById(
					req.params.id,
					// {
					// 	include: [ 'Status' ]
					// }
				).then(
					(obj) => {
							return res.send(helper.showOne(obj,200))
					}
				)

			})

		}

	})

}

exports.delete_image = function (req,res) {

	SicarProduct.findById(req.params.id).then( product => {
		if (product == null || product.length <= 0) {
			return  res.send(response.error('No se ha encontrado el registro con el id = '+req.params.id,400))
		}else{
			console.log('params',req.params);
			console.log('body',req.body);
			let listImages = []
			if (product.image != null && product.image.length > 1) {
				listImages = JSON.parse(product.image)
				listImages.splice(req.body.indice,1)
				listImages = JSON.stringify(listImages)

				SicarProduct.update(
					{
						image : listImages
					},
					{
						where:{
							id:req.params.id
						}
					}
				).then((updated)=>{
					SicarProduct.findById(
						req.params.id
					).then(
						(obj) => {
								return res.send(helper.showOne(obj,200))
						}
					)
				})
			}else {
				return res.send(response.success('No hay nada para eliminar'));
			}

		}

	})
}
exports.indexFilter = (req, res) => {
	console.log(req.query)
	let val=req.query.description
	let match=false
	let result=[]
	let resultfinish=[]
	let all_data;
	var success=0
	var fail=0
	SicarProduct.findAll({
	}).then(projects => {
		if (val && val.trim() != '') {
	      projects = projects.filter((item) => {
	        let listValues = val.split(" ")

	        for (var i of listValues) {
	           if ( i != ' ' && item.description.toLowerCase().indexOf(i.toLowerCase()) > -1 ) {
	             match = true
	           }else{
	             match = false
	             break;
	           }
	         }
	         all_data=match ? item : '';
	         if(match == true){
	         	result.push(all_data)
	         }
	      })
	    }
	    return res.send(helper.showAll(result,200))
    })
}