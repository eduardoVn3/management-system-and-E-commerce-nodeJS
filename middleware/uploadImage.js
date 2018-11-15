const multer=require('multer');
const moment = require('moment');
var date=moment().format('YYYY-MM-DD')
var hour=moment().format('hh-mm-ss')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(req.body.name);
    cb(null,date+'_'+hour+'_'+file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
	if(file.mimetype ==="image/jpeg" || file.mimetype ==="image/png"){
		cb(null,true);
	}else{
		cb(null,false)
	}
	//rechazar
}
// const upload = multer({
// 	storage:storage,
// 	fileFilter:fileFilter
// })

module.exports={
  storage,
  fileFilter
}
