const express = require("express")
const app = express()
const PORT = 3000;

const path = require("path")

// start


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
})

app.get("/handleForm", function (req, res) {
    // let wartosci = req.query.kolor + ' ' + req.query.radio + ' ' + req.query.cb
    kolor = req.query.kolor
    zmiana = "<style> body{background-color: " + kolor + ";</style> <h1>" + kolor + "</h1>"
    res.send(zmiana)
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})