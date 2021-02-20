const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,});
var conn =mongoose.Collection;
var classTeacherSchema =new mongoose.Schema({
    teachername:{type:String,
    },
 
    teacher_uid:{
        type:Number,
    },
    
    class_name: {
        type:Number,
    },       
    
    class_teacher_status:{type:String,
    },
    date:{
        type: Date, 
        default: Date.now }
});

var classTeacherModel = mongoose.model('classTeacher', classTeacherSchema);
module.exports=classTeacherModel;
//mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority

