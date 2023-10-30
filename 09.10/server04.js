const express = require("express")
const formidable = require('formidable')
const app = express()
const PORT = 3000;
const path = require("path")


// start

app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/server04.html"))
})

app.post('/handleUpload', function (req, res) {

    let form = formidable({});
    form.multiples = true
    let progressy = []
    let i = -1
    let starttime
    let endTime
    let runtime
    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.on("fileBegin", function () {
        starttime = new Date().getTime()
    })
    form.on("progress", function (bytesReceived, bytesExpected) {
        i = i + 1
        console.log("progress ", bytesExpected, bytesReceived, new Date().getTime())

        progressy[i] = { "progress: ": bytesExpected, "Otrzymane: ": bytesReceived, "Data: ": new Date().getTime() }
    })


    form.on("end", function () {
        endTime = new Date().getTime()
        runtime = endTime - starttime
        progressy[progressy.length] = { "fullTime: ": "cały zapis trwał: " + runtime }
    })
    form.parse(req, function (err, fields, files) {

        res.header("content-type", "application/json")
        res.send(JSON.stringify(progressy, null, 5))
    });

});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})