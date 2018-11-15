'use strict';
const db = require('.././config/db.config.js');
var helper = require('.././helpers')
const bcrypt = require('bcryptjs');
const moment = require('moment');
var fieldsValidator = require('fields-validator');
// var validateSale = require('.././validator/saleValidation.js');
var response = require('.././helpers/response')
var configModels = require('.././config/models')

var Sale_detail=db.Sale_detail

exports.index = (req,res)=>{
	Sale_detail.findAll(
    ).then(projects => {
      return res.send(helper.showAll(projects,200))
    });
}