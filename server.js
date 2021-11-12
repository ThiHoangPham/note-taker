// variables function
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")
// express app set
const app = express();
const PORT = 3000;
// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
