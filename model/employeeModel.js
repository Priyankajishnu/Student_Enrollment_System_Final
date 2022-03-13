const mongoose = require('mongoose');
let mongooseSchema=mongoose.Schema;
const employeeSchema=new mongooseSchema(
    {
        name: String,
        role:String,
        email:String,
        password:String,
        status:String
}
);
var employeModel=mongoose.model("employes",employeeSchema);
module.exports=employeModel;