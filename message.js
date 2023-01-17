const { request } = require('express');
const express=require('express');
var router=express.Router();
var db = require('./db.js');

//mesajlarin hepsini alma islemi
router.get("/", function(request, response){
    db.query("SELECT *FROM message", (error, results) => {
        if(error){
            response.status(500).send(error);
        }else{
            response.send(results);
        }
    });
});

//mesajdan id alma islemi
router.get("/:id", function(request, response){
    const id = request.params.id;
    db.query("SELECT *FROM message WHERE id = ?", [id], (error, results) => {
        if(error) {
            response.status(500).send(error);
        }
        else if(results.lenght > 0){
            response.send(results[0]);
        }
        else{
            response.sendStatus(404);
        }
    });
});

//veritabanina mesaji ekleme islemi
router.post("/", (request, response) => {
    const message = request.body;
    db.query(
        "INSERT INTO message(content) VALUES (?)",
        [message.content],
        (error, results) => {
            if(error){
                response.status(500).send(error);
            }
            else{
                response.status(201).send({
                    id: results.insertId,
                    ...message,
                });
            }
        }
    );
});

//veritabaninda mesajin icerigini güncelleme,düzenleme islemi
router.put("/:id", (request, response) => {
    const {content} =request.body;
    const id = request.id;
    db.query(
        "UPDATE message SET content = ? WHERE id = ?",
        [content, id],
        (error, results) => {
            if(error){
                response.status(500).send(error);
            }
            else{
                if(results.affectedRows > 0){
                    response.status(202).send({id: id, content: content});
                }else {
                    response.sendStatus(404);
                }
            }
        }
    );
});


//id kullanarak mesaji silme islemi
router.delete("/:id", (request, response) => {
    const id = request.params.id;
    db.query("DELETE FROM message WHERE id = ?",[id], (error, results) =>{
        if(error){
            response.status(500).send(error);
        } else{
            if (results.affectedRows > 0){
                response.sendStatus(204);
            }else{
                response.status(404).send({error:" bu id ${id} ile bir mesaj yok"});
            }
        }
    });
});

module.exports = router;