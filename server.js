// variables function
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

// express app set
var app = express();
var PORT = process.env.PORT || 3000;

// data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set index.html + notes.html for app 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
app.route("/api/notes")
    // get function
    .get(function (req, res) {
        res.json(database);
    })

    // post function
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let highestId = 99;
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];
            if (individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        }
        newNote.id = highestId + 1;
        database.push(newNote)
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        res.json(newNote);
    });

// delete function
app.delete("/api/notes/:id", function (req, res) {
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
            console.log("Your note was deleted!");
        }
    });
    res.json(database);
});

// final setup for server
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});
