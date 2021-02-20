var express = require('express');
var router = express.Router();
var teacherModule=require('../../../modules/teacher');
var getTeacher= teacherModule.find({});

var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/', function(req, res, next) {
  getTeacher.exec(function(err,data){
    if(err) throw err;
    res.render('./adminTeacherList/teacherList', { title: 'TechBista Solutions', records:data,disabled:"disabled",inactive:"inactive" });
  });
});


router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;
  var teacherDelete=teacherModule.findByIdAndDelete(id);
  teacherDelete.exec(function(err){
    if(err) throw err;
    res.redirect('/teacherList');
  });
});


router.get('/enable/:id', function(req, res, next) {
  var id=req.params.id;

  var teacher=teacherModule.findOne({_id:id});
  teacher.exec(function(err,data){
    if(err) throw err;
    var ObjectiId=data._id;

  var teacherUpdate=teacherModule.findByIdAndUpdate(ObjectiId,{teacher_status:'enabled'});
  teacherUpdate.exec(function(err){
    if(err) throw err;
    res.redirect('/teacherList');
  });
});
});

router.get('/disable/:id', function(req, res, next) {
  var id=req.params.id;

  var teacher=teacherModule.findOne({_id:id});
  teacher.exec(function(err,data){
    if(err) throw err;
    var ObjectiId=data._id;

  var teacherUpdate=teacherModule.findByIdAndUpdate(ObjectiId,{teacher_status:'disabled'});
  teacherUpdate.exec(function(err){
    if(err) throw err;
    res.redirect('/teacherList');
  });
});
});


router.get('/active/:id', function(req, res, next) {
  var id=req.params.id;

  var teacher=teacherModule.findOne({_id:id});
  teacher.exec(function(err,data){
    if(err) throw err;
    var ObjectiId=data._id;

  var teacherUpdate=teacherModule.findByIdAndUpdate(ObjectiId,{class_teacher_status:'active'});
  teacherUpdate.exec(function(err){
    if(err) throw err;
    res.redirect('/teacherList');
  });
});
});

router.get('/inactive/:id', function(req, res, next) {
  var id=req.params.id;

  var teacher=teacherModule.findOne({_id:id});
  teacher.exec(function(err,data){
    if(err) throw err;
    var ObjectiId=data._id;

  var teacherUpdate=teacherModule.findByIdAndUpdate(ObjectiId,{class_teacher_status:'inactive'});
  teacherUpdate.exec(function(err){
    if(err) throw err;
    res.redirect('/teacherList');
  });
});
});


  module.exports = router;