const mongoose = require ('mongoose');

//schema creation
let mongooseSchema = mongoose.Schema;
const studentSchema = new mongooseSchema(
    {
       name:String,
       email:String,
       password:String, 
       phonenumber:String,
        address:String,
        qualification:String,
        passout:String,
        skillset:String,
        employmentStatus:String,
        technologyTraining:String,
        payment:String,
        year:String,
        studid:String,
        image:String,
        course:String,
        mark:String
    }
)
//model creation
var studentModel = mongoose.model("students",studentSchema);

module.exports = studentModel;