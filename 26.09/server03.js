const express = require("express")
const app = express()
const PORT = 3000;
const bodyParser = require("body-parser")

app.use(express.json());

const path = require("path")


app.use(express.static('static'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/server03.html"))
})

app.post('/range', function (req, res) {
    console.log(req.body)
    let drange = req.body.drange
    let prange = req.body.prange
    res.header("content-type", "application/json")
    res.send(JSON.stringify(req.body, null, 5))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})