const multer=require('multer');
const moment = require('moment');
var date=moment().format('YYMMDD')
var hour=moment().format('hmm')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/generals')
  },
  filename: function (req, file, cb) {
    cb(null,date+hour+'_'+file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
  console.log('req',req);
	if(file.mimetype ==="image/jpeg" || file.mimetype ==="image/png"){
		cb(null,true);
	}else{
		cb(null,false)
	}
}
module.exports={
  storage,
  fileFilter
}
