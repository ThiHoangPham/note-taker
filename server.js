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

    })

// delete

// final setup for server
