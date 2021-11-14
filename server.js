// variables function
const express = require("express");
const fs = require("fs");
const { get } = require("http");
const path = require("path");
const database = require("./db/db")

// express app set
const app = express();
const PORT = 3000;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set index.html + notes.html for app 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

//get and post function
app.route("/api/notes")
    .get(function (req, res) {
        res.json(database);
    })
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let highestId = 99;
        for (let i = 0; 1 < database.length; i++) {
            let individualNote = database[i];
            if (individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        }
        newNote.id = highestId + 1;
        database.push(newNote);
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Your notes were saved");
        });
    });

// delete function
app.delete("api/note/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    for (let i = 0; i < database.length; i++) {
        if (database[i].id == req.params.id) {
            database.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("Your Notes Were Deleted!")
        }
    });
});
// final setup for server
