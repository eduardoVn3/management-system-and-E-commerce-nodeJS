'use stric'
const fs=require('fs')
fs.mkdir('./public/images', (err)=>{
	if(err){
		create_general();
		create_product();
		return console.log('<-----CARPETA IMAGES YA EXISTEN----->')
	}else{
		create_general();
		create_product();
		return console.log('<-----CARPETA IMAGES CREADA----->')
	}
})

function create_general() {
fs.mkdir('./public/images/generals', (err)=>{
	if(err){
		return console.log('<-----CARPETA GENERALS YA EXISTE----->')
	}else{
		return console.log('<-----CARPETA GENERALS CREADA----->')
	}
})
}
function create_product() {
fs.mkdir('./public/images/products', (err)=>{
	if(err){
		return console.log('<-----CARPETA PRODUCTS YA EXISTE----->')
	}else{
		return console.log('<-----CARPETA PRODUCTS CREADA----->')
	}
})
}