const express = require("express")
const formidable = require('formidable')
const app = express()
const PORT = 3000;
const path = require("path")


// start

app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/server03.html"))
})

app.post('/handleUpload', function (req, res) {
    
    let form = formidable({});
    form.multiples = true
    form.parse(req, function (err, fields, files) {

        console.log(form.bytesExpected, form.bytesReceived);

    });
    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia

    form.parse(req, function (err, fields, files) {

        console.log("Przesłane expected i received bytes");
        let bajty = []
        res.header("content-type", "application/json")
        bajty[0] = "Bytes exptected: " + form.bytesExpected
        bajty[1] = "Bytes received: " + form.bytesReceived
        res.send(JSON.stringify(bajty, null, 5))
    });
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})