const express = require('express');
const router = express.Router();
const studentModel = require('../model/studentModel');
const employeeModel = require('../model/employeeModel');
const { route } = require('express/lib/router');


//getAll students
router.get('/api/students', async(req,res)=>{
    studentModel.find()
     .then(function(student){
         res.send(student);
     });
});


//Get single student by id
router.get('/api/students/:id',(req,res)=>{

    try{
        const id=req.params.id;
        studentModel.findOne({_id:id})
          .then((student)=>{
           res.send(student);
        })
    }
    catch(error){
        res.status(500).json({message: "err"})

    }   
      
});

//Search student
router.get('/api/search-student', async(req,res)=>{
   
    studentModel.find()
     .then(function(student){
         res.send(student);
     });
});

//getAll employee
router.get('/api/employee', async(req,res)=>{
     
    employeeModel.find()
     .then(function(employee){
         res.send(employee);
     });
});

//Get single employee by id
router.get('/api/employee/:id',(req,res)=>{ 

    try{
        const id=req.params.id;
        employeeModel.findOne({_id:id})
          .then((employee)=>{
           res.send(employee);
        })
    }
    catch(error){
        res.status(500).json({message: "err"})
    }   
});

//Search employee
router.get('/api/search-employee', async(req,res)=>{
    employeeModel.find()
     .then(function(employee){
         res.send(employee);
     });
});

//Update student
router.post('/api/edit-stud/:id', async (req, res) => {
    
    try { 
         const id=req.params.id;
         studentModel.findByIdAndUpdate({_id:id},
         {
            $set:{
                name:req.body.name,
                email:req.body.email,
                phonenumber:req.body.phonenumber,
                address:req.body.address,
                qualification:req.body.qualification,
                passout:req.body.passout,
                skillset:req.body.skillset,
                employmentStatus:req.body.employmentStatus,
                technologyTraining:req.body.technologyTraining,
                year:req.body.year,
                course:req.body.course,
                payment:req.body.payment,
                mark:req.body.mark,
                studid:req.body.studid,
                image:req.body.image
                }
         })
          .then((student)=>{
              console.log("Details of"+req.body.name+"updated successfully!!")
              res.send(student);
          })
        }
    
    catch (err) {
        console.log(err);
    }
});

//delete student
router.delete('/api/delete-stud/:id', async (req, res) => {

    try {
        id=req.params.id;
        studentModel.findOneAndDelete({_id:id})
        .then((student)=>{
            console.log("Successfully deleted!!");
            res.send(student);
        })
    }
    catch (err) {
        console.log(err);
    }
});

// //Approve employee
// router.post('/api/approve-employee',(req,res)=>{
    
//     employeeModel.updateOne(
//         { 
//             _id: req.body.id 
//         },
//         {
//             $set: { 'status': 'approved'} 
//         }).then((employee)=>{
//             employeeModel.findOne({_id:req.body.id},function(err,employee){ 
//                 employeeMail(employee.email).then((response)=>{
//                     console.log(response);
//                     res.send();
//                 })
//             })
//         })
// })
    

// //Decline employee
// router.delete('/api/reject-employee/:id',(req,res)=>{  
//     id = req.params.id;
//     employeeModel.findByIdAndDelete({_id:id})
//     .then(()=>{
//         console.log('success')
//         res.send();
//     })
// });   

//Update employee
    router.post('/api/edit-emp/:id', async (req, res) => {
       
        try {
        const id=req.params.id;
        employeeModel.findByIdAndUpdate({_id:id},
         {
            $set:{
                name:req.body.name,
                email:req.body.email,
                role:req.body.role,
                }
         })
          .then((employee)=>{
              console.log("Details of"+ req.body.name+"updated successfully!!")
              res.send(employee);
          })                                                                 
        }
        catch (err) {
            console.log(err);
        }
    });

    //delete employee
    router.delete('/api/delete-emp/:id', async (req, res) => {
         
        try {
            id=req.params.id;
            employeeModel.findOneAndDelete({_id:id})
            .then((employee)=>{
                console.log("Successfully deleted!!");
                res.send(employee);
            })
        }
        catch (err) {
            console.log(err);
        }
    });

    module.exports=router;

