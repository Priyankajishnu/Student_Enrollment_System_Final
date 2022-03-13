const express = require('express');
const router= express.Router();
const employeeModel = require('../model/employeeModel');


 //approve employee
 router.post('/api/approveemploye', async (req, res) => {
    try {
        console.log(req.body);
        let mydata = new employeeModel(req.body);
        let data = await mydata.save();
        console.log("Successfully Approved Data");
        res.send("Successfully Approved Data");
    }
    catch (err) {
        console.log(err);
    }
});

// decline employee 
router.delete('/api/reject-employee/:id',(req,res)=>{  
    id = req.params.id;
    employeeModel.findByIdAndDelete({_id:id})
    .then(()=>{
        console.log('success')
        res.send();
    })
});   