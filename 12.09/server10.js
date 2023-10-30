const express = require('express')
const PORT = 3000
const app = express()
app.use(express.static('static'))
const path = require('path')

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/server10.html"))
})

app.get("/kwadrat", function (req, res) {
    count = req.query.count
    bg = req.query.bg
    string = "<div style=width:2000px;"
    string = string + "height:6000px;display:flex;>"
    for (let i = 0; i < count; i++) {
        string = string + "<div style=width:100px;"
        string = string + "display:flex;"
        string = string + "height:100px;display:flex;justify-content:center;align-items:center;margin:5px;"
        string = string + "background-color:" + bg + ";>" + i + "</div>"
    }
    string = string + "</div>"
    res.send(string)
})

app.listen(PORT, function () {
    console.log(`serwer dziala na porcie ${PORT}`)
})