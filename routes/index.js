const express = require('express');
const router = express.Router();
const uploadGeneralMiddleware = require('../middleware/uploadImageGeneral');
const uploadProductMiddleware = require('../middleware/uploadImageProduct');
const multer=require('multer');

const uploadGeneral = multer({
	storage:uploadGeneralMiddleware.storage,
	fileFilter:uploadGeneralMiddleware.fileFilter
})

const uploadProduct = multer({
	storage:uploadProductMiddleware.storage,
	fileFilter:uploadProductMiddleware.fileFilter
})
//
// const { check, validationResult } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');

var ctrl = require('.././controllers');
//
router.get('/users', ctrl.UserController.index)
router.post('/users',ctrl.UserController.store)
router.get('/login',ctrl.UserController.login)

router.get('/users/:id',ctrl.UserController.show)
// router.put('/users/:id',upload.single('avatar'),ctrl.UserController.update)
router.delete('/users/:id',ctrl.UserController.delete)

router.get('/users/:id/permissions',ctrl.UserPermissionController.show)

router.get('/status', ctrl.StatusController.index)
//Suggestion
router.get('/suggestions',ctrl.SuggestionController.index)
// router.post('/suggestion',upload.single('image'),ctrl.SuggestionController.store)
router.post('/suggestions',ctrl.SuggestionController.store)
router.put('/suggestions/:id',ctrl.SuggestionController.update)
//productos
router.get('/productssicars', ctrl.ProductsSicarController.index)
router.post('/productssicarsempty', ctrl.ProductsSicarController.store)
router.put('/productssicars/:id', ctrl.ProductsSicarController.update)

router.get('/productssicars/filters', ctrl.ProductsSicarController.indexFilter)//agregado eduardo 16/07
// router.get('/productssicars/filtersTags', ctrl.ProductsSicarController.indexFilterTag)//agregado eduardo 16/07
//update a todos
router.post('/productssicarssyncup', ctrl.ProductsSicarController.UpdateAll)

//category
////Category
router.get('/categories', ctrl.CategoryController.index)
router.post('/categories', ctrl.CategoryController.store)

router.get('/permissions', ctrl.PermissionController.index)
router.get('/permissions/:id', ctrl.PermissionController.show)
router.put('/permissions/:id', ctrl.PermissionController.update)

router.get('/featuresystem', ctrl.FeaturesystemController.index)
router.get('/enchangerate', ctrl.FeaturesystemController.enchangerate)

//score user
router.post('/score/all/:user_id', ctrl.ScoreController.index)
router.post('/score', ctrl.ScoreController.store)
router.post('/score/one/:user_id',ctrl.ScoreController.show)
router.delete('/score/:id',ctrl.ScoreController.delete)
router.get('/scores/available_dates',ctrl.ScoreController.available_dates)

//clientes
router.get('/clients', ctrl.ClientController.index)
router.post('/clients', ctrl.ClientController.store)
router.get('/clients/:id',ctrl.ClientController.show)
router.delete('/clients/:id',ctrl.ClientController.delete)
router.get('/login/clients',ctrl.ClientController.login)
router.put('/clients/:id', ctrl.ClientController.update)

//sale (ventas)
router.get('/sales', ctrl.SaleController.index)
// router.post('/sales', ctrl.SaleController.store)
router.put('/sales/:id', ctrl.SaleController.update)

//sale details
router.get('/salesdetails', ctrl.Sale_detailController.index)

//subir imagenes a property
router.get('/uploadimages',ctrl.PropertyController.show)
router.post('/uploadimages',uploadGeneral.array('image',5),ctrl.PropertyController.store)
router.delete('/uploadimages/:id',ctrl.PropertyController.delete)

//subir imagenes a productos
// router.get('/uploadimageproduct/:id',ctrl.ProductsSicarController.show)
router.post('/uploadimageproduct/:id',uploadProduct.array('image',5),ctrl.ProductsSicarController.upload_image)
router.delete('/uploadimageproduct/:id',ctrl.ProductsSicarController.delete_image)

router.get('/orders',ctrl.OrderController.index)
router.get('/orders/:id/order_detail',ctrl.OrderDetailController.index)



module.exports = router;
