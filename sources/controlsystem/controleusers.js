const express = require("express");
const app = express.Router();

const brugerModel = require("./../usersystem/users")
const database = require("../helpersystem/db");

//Oprettelse af bruger i min database
app.post("/opretbruger", (req, res) => {
    const bruger = new brugerModel(req.body.email, req.body.password);
    database.saveUser(bruger);
    res.status(200).send(true);
});

//Sletning af bruger i min database
app.delete("/sletbruger", (req, res) => {
    const bruger = new brugerModel(req.body.email, req.body.password);
    database.deleteUser(bruger);
    res.status(200).send(true);
});