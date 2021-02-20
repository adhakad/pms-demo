const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,});
var conn =mongoose.Collection;
var classSchema =new mongoose.Schema({
    tObj_id:{
        type:String,
    },
    teacher_id:{type:Number,
        index:{
            unique:true
        },
    },
    image_id:String,
    class_name: {type:Number,
        required:true, 
        index: {
            unique: true,        
        }
        },        
    subject_name: {
        type:String, 
        },
    room_id: {
        type:Number, 
        },
    
});

var classModel = mongoose.model('class', classSchema);
module.exports=classModel;

//mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority