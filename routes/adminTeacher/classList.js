var express = require('express');
var router = express.Router();
var classModule=require('../../modules/class');
var userStudentModule=require('../../modules/studentUser');
var teacherProfileModule=require('../../modules/teacher');



const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/:id', function(req, res, next) {
  var ids = req.params.id;
  var getClass= classModule.findOne({teacher_id:ids});
    getClass.exec(function(err,data){
      if(err) throw err;
    if(data==null){
      res.redirect('/teacher-admin-dashboard/'+ids);
    }else{
      res.render('./classList/classList', { title: 'Class Name List', records:data });
    }  
  });


  router.get('/delete/:id', function(req, res, next) {
    var id=req.params.id;

    var exist_id=1234567890;
    var class_name=224165;
    var subject_name="saw24d66tfsw";

    var teacherAdminClass=teacherProfileModule.findOne({teacher_uid:id});
    teacherAdminClass.exec(function(err,data){
      if(err) throw err;
      var ObjectId_id = data._id;
      console.log(data._id);console.log(data._id);console.log(data._id);console.log(data._id);
    var teacherAdminClassDelete=classModule.findOneAndDelete({teacher_id:id});
    teacherAdminClassDelete.exec(function(err){
      if(err) throw err;
      var userStudent=userStudentModule.findOneAndDelete({student_id:id});
      userStudent.exec(function(err){
      if(err) throw err;
      var UdtTeacherProfile= teacherProfileModule.findByIdAndUpdate(ObjectId_id,{exist_id:exist_id});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      var UdtTeacherProfile= teacherProfileModule.findByIdAndUpdate(ObjectId_id,{class_name:class_name});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      var UdtTeacherProfile= teacherProfileModule.findByIdAndUpdate(ObjectId_id,{subject_name:subject_name});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      res.redirect('/teacher-admin-dashboard/'+id);
      });
    });
  });
  });

});








  module.exports = router;