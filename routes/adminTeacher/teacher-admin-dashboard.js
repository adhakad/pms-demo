var express = require('express');
var router = express.Router();

var teacherModule=require('../../modules/teacher');
var classModule=require('../../modules/class');
var classTeacherModal=require('../../modules/classTeacher');


const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/:id',function(req, res,) {
  var id =req.params.id;
  var getTeacher=teacherModule.findOne({teacher_uid:id});
  getTeacher.exec((err, data)=>{
    if(err) throw err;
    if(data){

      var getClass=classModule.findOne({teacher_id:id});
      getClass.exec((err, datas)=>{

        classTeacher=classTeacherModal.find({teacher_uid:id});
        classTeacher.exec((err,result)=>{
        if(err) throw err; 
        if(result==null){

          if(datas==null){
            res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:'',result:'' });
          }else{
            res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:datas,result:'' });
          }

        }else{

          if(datas==null){
            res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:'',result:result });
          }else{
            res.render('teacher-admin-dashboard', { title: 'TechBista Solutions', msg:'',records:data,datas:datas,result:result });
          }

        }       

        
    
        });
      });

    }else{
      res.send('data not found');
    }
    
    
  });
});


  module.exports = router;