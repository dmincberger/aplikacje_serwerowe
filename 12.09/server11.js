const express = require('express')
const app = express()
const PORT = 3000
app.use(express.static('static'))
const path = require('path')

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/static/server11.html'))
})

app.get("/convert", function (req, res) {
    if (req.query.degToRad) {
        let radiany = req.query.stopnie
        let stopnie = radiany * (180 / Math.PI)
        res.send(`${radiany}radianow = ${stopnie}stopni`)
    } else {
        let stopnie = req.query.stopnie
        let radiany = stopnie * (Math.PI / 180)
        res.send(`${stopnie}stopni = ${radiany}radianow`)
    }
})

app.listen(PORT, function () {
    console.log(`Serwer dziala na porcie ${PORT}`)
})