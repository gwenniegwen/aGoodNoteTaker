const fs = require ("fs");
// const app = require("express");
// const notes = require('../public/assets/js/index')
let userInput = require("../db/db.json");
let currentIDS = userInput.map(note=>note.id);

//Get Requests//

module.exports = function (app) {
    app.get("/api/notes", function(req, res) {
        res.json(userInput);
      
   

//Post Request//

app.post("/api/notes", function(req, res){
    let newID = 0;
    while (currentIDS.includes(newID)) {
        newID++ 
    }
    currentIDS.push(newID)
    const newNote = {
        id:newID,
        title:req.body.title,
        text: req.body.text,
    }
    
    userInput.push(newNote);
    
    fs.writeFile("./db/db.json", JSON.stringify(userInput),"utf8",(err,data)=>{
        if (err) throw err
    })
    res.json(newNote)


   
    })

})

    
//delete Request//
app.delete("/api/notes/:id", function(req, res){
    
        var id = parseInt(req.params.id)
        for (var i = 0; i < userInput.length; i++) {
            if (userInput[i].id === id) {
                userInput.splice(i, 1);
            }
        }
         
        fs.writeFile("./db/db.json", JSON.stringify(userInput), function (err) {
            res.json(userInput)
        })

    



   




})




}