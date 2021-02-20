var express = require('express');
var router = express.Router();
var studentUserModule=require('../../../modules/studentUser');
var classModule=require('../../../modules/class');
var totalAdminClass=require('../../../modules/totalAdminClass');



const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/', function(req, res,) {
  var totalClass=totalAdminClass.find({});
  totalClass.exec((err,data)=>{
  if(err) throw err;
    res.render('./admin/students/studentClassList', { title: 'TechBista Solutions', records:data});
  });
});


router.get('/studentList/:id', function(req, res, next) {
  var class_name=req.params.id;
  var getStudentUser= studentUserModule.find({class_name:class_name});
  getStudentUser.exec(function(err,data){
  if(err) throw err;
  res.render('./admin/students/studentsList', { title: 'TechBista Solutions',msg:'', records:data,disabled:"disabled" });
});
});


router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;

  var student=studentUserModule.findOne({student_id:id});
  student.exec(function(err,data){
    var class_name = data.class_name;
    if(err) throw err;

  var getChekStudent= classModule.findOne({teacher_id:id}); 
  getChekStudent.exec(function(err,data){
  if(err) throw err;
  if(data==null){
    var studentDelete=studentUserModule.findOneAndDelete({student_id:id});
    studentDelete.exec(function(err){
      if(err) throw err;
      res.redirect('/studentList/studentList/'+class_name);
    });  
  }else{
      res.redirect('/studentList/studentList/'+class_name);
  }
  });
});
});

router.get('/enable/:id', function(req, res,) {
  var id=req.params.id;

  var student=studentUserModule.findOne({student_id:id});
    student.exec(function(err,data){
      if(err) throw err;
      var ObjectiId=data._id;
      var class_name = data.class_name;

  var getChekStudent= classModule.findOne({teacher_id:id}); 
  getChekStudent.exec(function(err,data){
  if(err) throw err;
  if(data==null){
    var studentStatus=studentUserModule.findByIdAndUpdate(ObjectiId,{status:'enabled'});
    studentStatus.exec(function(err){
      if(err) throw err;
      
      res.redirect('/studentList/studentList/'+class_name);
      
    });  
  }else{
    
      res.redirect('/studentList/studentList/'+class_name);
      
  }
  });
});
});

router.get('/disable/:id', function(req, res, next) {
  var id=req.params.id;

  var student=studentUserModule.findOne({student_id:id});
    student.exec(function(err,data){
      if(err) throw err;
      var ObjectiId=data._id;
      var class_name = data.class_name;

  var getChekStudent= classModule.findOne({teacher_id:id}); 
  getChekStudent.exec(function(err,data){
  if(err) throw err;
  if(data==null){
    var studentStatus=studentUserModule.findByIdAndUpdate(ObjectiId,{status:'disabled'});
    studentStatus.exec(function(err){
      if(err) throw err;
      
      res.redirect('/studentList/studentList/'+class_name);
    
    });  
  }else{
    
      res.redirect('/studentList/studentList/'+class_name);
      
  }
  });
});
});


  module.exports = router;