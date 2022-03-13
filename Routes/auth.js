const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const studentModel = require('../model/studentModel');
const employeeModel = require('../model/employeeModel');

//Register as student
router.post('/studentregister',async(req,res)=>{
    try{
        const {name,email,password,phonenumber,address,qualification,passout,skillset,employmentStatus,technologyTraining,
        payment,course} = req.body.data;
        
        if(!name || !email || !password ||!phonenumber||!address||!qualification||!passout||!skillset||!employmentStatus||!technologyTraining||!payment||!course)

            return res.json({message:"Invalid Credentials"});

            const userExist = await studentModel.findOne({email:email});
            
            if(userExist)  return res.json({message:"User already exists"})
        
            else{
          
                const newUser = new studentModel({
                    email:email,
                    password:password,
                    name:name,
                    phonenumber:phonenumber,
                    address:address,
                    qualification:qualification,
                    passout:passout,
                    skillset:skillset,
                    employmentStatus:employmentStatus,
                    technologyTraining:technologyTraining,
                    payment:payment,
                    // studid:studid,
                    // image:image,
                    course:course,
                });
                newUser.save();
                return res.json({message:"User Created",newUser})
            }
    }
    catch(err){
        console.log(err);
    }
});

// Register as employee

router.post('/employeeregister',async(req,res)=>{
    try{
        const {name,email,password,role} = req.body.data;
        if(!name || !email || !password ||!role)
            return res.json({message:"Invalid Credentials"});
            
            const userExist = await employeeModel.findOne({email:email});
            
            if(userExist)  return res.json({message:"User already exists"})
        
            else{
                const newUser = new employeeModel({
                    email:email,
                    password:password,
                    name:name,
                    role:role,
                    // status:status
                });
                newUser.save();
                return res.json({message:"User Created",newUser})
            }
    }catch(err){
        console.log(err);
    }
});

//Middleware for employee
function isAuthenticated(req,res,next){
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,'employeekey',(err,user)=>{
            if(!user)
                return res.json({message:"User not authenticated"});
            else next();
        });
    }
}

//Employee Login
router.post('/employeelogin',async(req,res)=>{
    const{email,password} =req.body.data;
    if(!email || !password)
        return res.json({message:"Invalid Credentials"});
    
    const user = await employeeModel.findOne({email:email});
    if(user){

        if(user.password===password){
            const payload = {
                email
            };
            jwt.sign(payload,"employeekey",{expiresIn:"1d"},(err,token)=>{
            
                if(err) console.log(err);
                else{
                    return res.json({message:"Employee Logged In",token:token});
                }
            });
        }
        else{
            return res.json({message:"Incorrect password"});
        }
    }
    else{
        return res.json({message:"Invalid credentials"});
    }
     
});

//student Login
router.post('/studentlogin',async(req,res)=>{
    const{email,password} =req.body.data;
    console.log(req.body);
    if(!email || !password)
        return res.json({message:"Invalid Credentials"});
    
    const user = await studentModel.findOne({email:email});
    if(user){

        if(user.password===password){
            const payload = {
                email
            };
            jwt.sign(payload,"studentkey",{expiresIn:"1d"},(err,token)=>{
            
                if(err) console.log(err);
                else{
                    return res.json({message:"Student Logged In",token:token});
                }
            });
        }
        else{
            return res.json({message:"Incorrect password"});
        }
    }
    else{
        return res.json({message:"Invalid credentials"});
    }
     
});


//admin login
const adminuser = [
    {
        id:"1",
        username:"Admin",
        password:"admin123",
        isAdmin:true,
    },
    // {
    //     id:"2",
    //     username:'user',
    //     password:'user123',
    //     isAdmin:false,
    // }
];
router.post('/adminlogin',(req,res)=>{
    const{username,password} = req.body.data;
  const aduser = adminuser.find(u=>{
      return u.username === username && u.password===password;
    });
    if(aduser){
       //generate accesstoken
       const accessToken = jwt.sign({id:aduser.id,isAdmin:aduser.isAmdin},process.env.SECRET_KEY,{expiresIn:"1d"});
       res.json({
           username:aduser.username,
           isAdmin:aduser.isAdmin,
           accessToken,
       })
    }else{
        res.status(400).json("Username or password incorrect")
    }
});
//middleware for admin
const adminverify = (req,res,next)=>{
   
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY,(err,aduser)=>{
            if(!aduser)
            return res.json({message:"User not authenticated"});
            else next();
        });
    }
};
// router.get('/protected', adminverify,(req,res)=>{
//     res.json("this is protected route")
// } )

router.post('/logout',adminverify,(req,res)=>{
    const accessToken =req.body.token;
    accessToken = accessToken.filter((token)=>token!=accessToken);
    res.status(200).json("You logged out successfully")
})
module.exports = router;