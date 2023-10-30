const express = require("express")
const app = express()
const PORT = 3000;

const path = require("path")

app.get("/strona1", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona1.html"))
    console.log(__dirname)
})
app.get("/strona2", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona2.html"))
    console.log(__dirname)
})
app.get("/strona3", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona3.html"))
    console.log(__dirname)
})

// start

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})