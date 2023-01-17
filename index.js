const express=require('express');
const app=express();
var bodyParser=require('body-parser');


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const userRouter=require('./user');
app.use('/user',userRouter);

//portta calisip calismadigini kontrol ediyoruz
app.listen(3010,()=>console.log('sunucunuz 3010 numarali baglanti noktasinda calisiyor.')); 