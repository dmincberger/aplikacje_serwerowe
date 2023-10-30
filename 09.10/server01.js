const express = require("express")
const formidable = require('formidable')
const app = express()
const PORT = 3000;
const path = require("path")


// start

app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/server01.html"))
})

app.post('/handleUpload', function (req, res) {

    let form = formidable({});
    form.multiples = true

    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia

    form.parse(req, function (err, fields, files) {

        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);
        let tabela = []
        tabela[0] = fields
        tabela[1] = files
        res.header("content-type", "application/json")
        res.send(JSON.stringify(tabela, null, 5))
    });
});


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})