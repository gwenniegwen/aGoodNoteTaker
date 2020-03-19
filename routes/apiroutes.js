const fs = require ("fs");
let userInput = require("../db/db.json");
let currentIDS = userInput.map(note=>note.id);

module.exports = function (app) {
    app.get("/api/notes", function(req, res) {
        res.json(userInput);
      });


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
    });
    res.json(newNote)
})
}