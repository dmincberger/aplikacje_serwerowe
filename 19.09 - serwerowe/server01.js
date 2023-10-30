const express = require("express")
const app = express()
const PORT = 3000;
const bodyParser = require("body-parser")
const path = require("path")

// start


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
})

app.get("/handleForm", function (req, res) {
    // let wartosci = req.query.kolor + ' ' + req.query.radio + ' ' + req.query.cb
    res.send(req.query)
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})