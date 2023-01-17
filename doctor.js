const express=require('express');
const router=express.Router();
var db=require('./db.js');

router.route('/register').post((req,res)=>{
    var name=req.body.name;
    var major=req.body.major;
    var password=req.body.password;
    var image=req.body.image;
});

//doktor bilgilerini alma islemi
router.get("/", function(request, response){
    db.query("SELECT *FROM doctor", (error, results) => {
        if(error){
            response.status(500).send(error);
        }else{
            response.send(results);
        }
    });
});