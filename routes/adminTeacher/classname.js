var express = require('express');
var router = express.Router();
var teacherModule=require('../../modules/teacher');
var classModule=require('../../modules/class');
var studentUserModule=require('../../modules/studentUser');

var bcrypt =require('bcryptjs');
var bodyParser = require('body-parser');
router.use(express.static(__dirname+"./public/"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
const e = require('express');

function checkTeacherUid(req,res,next){
   var id = req.params.id;
   var getClass= classModule.findOne({teacher_uid:id});
   getClass.exec((err,data)=>{
   if(err) throw err;
   if(data){
 return res.render('class', { title: 'Class Details', msg:'Class Details Already Exist',records:data });
  }
  next();
   });
 }


router.get('/:id',function(req, res, next) {
   var id = req.params.id;
   var getTeacher= teacherModule.findOne({teacher_uid:id});
   getTeacher.exec(function(err,data){
      if(err) throw err;
     res.render('class', { title: 'Class Details',msg:'',records:data});
   }); 
});

 
router.post('/',function(req, res, next) { 
   var tObj_id=req.body.tObj_id;
   var teacher_id=req.body.teacher_id; 
   var teachername=req.body.teachername;
   var password=req.body.password;
   var image_id=req.body.image_id;
   var class_name=req.body.class_name;  
   var subject_name=req.body.subject_name; 
   var room_id=req.body.room_id; 
   var status="enabled";
   var getClass= classModule.findOne({class_name:class_name});
   getClass.exec(function(err,data){
   if(err) throw err;
   
   if(data==null){
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{exist_id:teacher_id});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{class_name:class_name});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(tObj_id,{subject_name:subject_name});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      var userDetails=new classModule({
         tObj_id:tObj_id,
         teacher_id:teacher_id,
         image_id:image_id,
         class_name:class_name,
         subject_name:subject_name,
         room_id:room_id
       });
    userDetails.save((err,data)=>{
       if(err) throw err; 
       password =bcrypt.hashSync(req.body.password,10);
       var userStudentDetails=new studentUserModule({
         student_name:teachername,
         class_name:class_name,
         student_id:teacher_id,
         password:password,
         status:status,
       }); 
         userStudentDetails.save((err,datas)=>{
         if(err) throw err;
           res.render('class', { title: 'Class Details', msg:'Class Details Insert Successfully',records:data });
         });
      });
   }else{
      res.render('class', { title: 'Class Details', msg:'This Class Already Created',records:data });
   } 
 });
});
module.exports = router;
