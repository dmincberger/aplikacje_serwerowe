const express = require('express');
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000;

const path = require("path")

// start

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularzp.html"))
})

app.post("/handleForm", function (req, res) {
    // let wartosci = req.query.kolor + ' ' + req.query.radio + ' ' + req.query.cb
    kolor = req.body.kolor
    dane = req.body
    wdane = "<style> body{background-color: " + kolor + ";</style> <h1>" + kolor + "</h1>" + JSON.stringify(dane)
    res.send(wdane)
    console.log(dane)
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})