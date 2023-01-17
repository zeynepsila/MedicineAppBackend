const express=require('express');
var mysql=require('mysql');

//veritabani ile baglanti kuruluyor
var connection=mysql.createConnection
({
    host : 'localhost',
    user : 'root',
    password : '',
    port : '3306',        // 3306 mysql'in default port numarasi
    database : 'teletip_veritabani'  // veritabanimizin adi
});

//baglantinin saglanip saglanmadigini kontrol ediyoruz
connection.connect(function(err){
    if(err) throw err;
    console.log('veritabanina baglanildi!');
});


module.exports = connection;