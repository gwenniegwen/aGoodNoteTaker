const fs = require ("fs");
const express = require("express")
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
    });
    res.json(newNote)


    app.delete("/api/notes/:id",(req, res)=>{
        let id = req.param.id
        console.log(id)
        newNote.remove(id, function (err){
            if(err){
                console.log(err);
            }
            res.send("Success");
        })

    })
//delete Request//
});

//    delete  [id]
//     //let id = req.params.id;
//     console.log("./db/db.json", JSON.stringify(id))
//     //     data=JSON.parse(data);
//     // });
//     //delete data ["notes" + id];

        
//       let check = res.send('Got a DELETE request at /api/notes/:id');
//     console.log(check)


    // ("/api/notes", function(req, res) {
    //     res.json(userInput);
    //   });

})

}