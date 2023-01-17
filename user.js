const express=require('express');
const router=express.Router();
var db=require('./db.js');

router.route('/register').post((req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var password=req.body.password;;

    //sorgular
    var sqlQuery="INSERT INTO user(name,email,phone,password) VALUES (?,?,?,?)";

    //veritabanini cagirarak veritabanini dahil etme, veritabanina ekleme islemi
    db.query(sqlQuery,[name,email,phone,password],function(error,data,fields){

        if(error)
        {
            // hata olursa yanıtın gelecegi alan
            res.send(JSON.stringify({success:false,message:error}));
        }else{
            // hata olmazsa yanıtın gelecegi alan
            res.send(JSON.stringify({success:true,message:'register'}));
        }
    });

});


router.route('/login').post((req,res)=>{

    var eamil=req.body.email;
    var password=req.body.password;

    var sql="SELECT * FROM user WHERE email=? AND password=?";
    
    if(eamil != "" && password !=""){
        db.query(sql,[eamil,password],function(err,data,fields){
            if(err){
                res.send(JSON.stringify({success:false,message:err}));

            }else{
                if(data.length > 0)
                {
                    res.send(JSON.stringify({success:true,user:data}));
                }else{
                    res.send(JSON.stringify({success:false,message:'Empty Data'}));
                }
            }
        });
    }else{
        res.send(JSON.stringify({success:false,message:'Email and password required!'}));
    }

});


module.exports =router;