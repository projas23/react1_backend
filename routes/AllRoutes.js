let express = require("express");
const {housesModel,usersModel,enquiriesModel} = require("../models/allschemas");
let allroutes = express.Router();
const multer = require("multer");
const upload = multer();


allroutes.get('/',(req,res) => {
    console.log(" reached root");
    res.send("Welcome to FSD3_backend server");
});


allroutes.get('/houses',async (req,res) => {
    console.log(" reached /houses");
    try{
        let houses = await housesModel.find({});
        res.send(houses);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching houses");
    }
   
});


allroutes.post('/signup',upload.none(),async (req,res) =>{
    try{
        console.log(req.body);
        let newuser = new usersModel(req.body)
        let userFromDB = await newuser.save();
        console.log(userFromDB);
        res.send(userFromDB);
    }
    catch(err){
        console.log(" error while adding user. check if it is duplicate");
        console.log(err);
        res.status(500).send(err)
    }
});




allroutes.post('/login',upload.none(),async (req,res) =>{
    try{
        console.log(req.body);
        // use model and find  
        let response = await usersModel.find({email:req.body.email,password:req.body.password});
        console.log(response);        
        res.send(response);      
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});




allroutes.post('/addenquiry',upload.none(),async (req,res) =>{
    try{
        console.log(req.body);
        let newEnquiry = new enquiriesModel(req.body)
        let enquirySavedFromDB = await newEnquiry.save();
        console.log(enquirySavedFromDB);
        res.send(enquirySavedFromDB);
    }
    catch(err){
        console.log(" error while adding enquiry.");
        console.log(err);
        res.status(500).send(err)
    }
});


allroutes.get('/enquiries',async (req,res) => {
    console.log(" reached /enquiries");
    try{
        let enquiries = await enquiriesModel.find({});
        res.send(enquiries);
    }
    catch(err){
        console.log(err);
        res.status(500).send(" error while fetching enquiries");
    }
   
});






module.exports = allroutes;
