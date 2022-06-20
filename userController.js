const res = require("express/lib/response");
const multer=require("multer");
const multerconfig=multer.diskStorage({
    destination:(req,file,callback) =>{
callback(null,'Public/'); },
    filename:(req,file,callback)=>{
        const ext= file.mimetype.split("/")[1];
        callback(null,"image.${Date.now()},${ext}");
    },
});
const isImage = (req,file,callback)=>{
   if (file.mimetype.startWith('image')) {
       callback(null,true)
   }else{
       callback(new Error('New image is allowed only'));
   }
};



const upload=multer({
    storage:multerconfig,
    fileFilter: isImage,
    });
exports.UploadImage=upload.single("photo");

exports.upload=(req,res)=>{
    console.log (req.file);
    res.status(200).json({
        success:"Success"
    })
}