const express = require("express")
const app = express()
const PORT = 3000;
const bodyParser = require("body-parser")

app.use(express.json());

const path = require("path")


app.use(express.static('static'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/server04.html"))
})

app.post("/range", function (req, res) {
    console.log(req.body)
    let red = req.body.red
    let green = req.body.green
    let blue = req.body.blue
    let opac = req.body.blue
    res.header("content-type", "application/json")
    res.send(JSON.stringify(req.body, null, 5))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})