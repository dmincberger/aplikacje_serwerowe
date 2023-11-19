const express = require("express")
const app = express()
const PORT = 3000
app.use(express.static('static'))
const path = require("path")
const formidable = require('formidable');
const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs', extname: '.hbs',
    partialsDir: "views/partials",
}),
);



let context = {}
let pliczki = []
let id = 1

app.get('/show', function (req, res) {
    przycisk = req.query.id
    for (let i = 0; i < pliczki.length; i++) {
        if (pliczki[i]["id"] == przycisk) {
            sciezka = pliczki[i]["path"]
            break
        }
    }
    res.sendFile(sciezka)
});

app.post('/Upload', function (req, res) {

    let form = formidable({});
    form.multiples = true
    form.keepExtensions = true

    form.uploadDir = __dirname + '/static/upload/'

    form.parse(req, function (err, fields, files) {
        let now = new Date();

        if (files["filesupload"][0] == undefined) {
            if (files["filesupload"]["type"] == "image/jpeg") {
                files["filesupload"]["image"] = "gfx/9055550_bxs_file_jpg_icon.png"
            } else if (files["filesupload"]["type"] == "image/png") {
                files["filesupload"]["image"] = "gfx/7481720_png_file_format_document_icon.png"
            } else if (files["filesupload"]["type"] == "text/plain") {
                files["filesupload"]["image"] = "gfx/3209599_file_text_txt_icon.png"
            } else {
                files["filesupload"]["image"] = "gfx/9023994_question_fill_icon.png"
            }
            let time = now.getTime();
            files["filesupload"]["id"] = id
            files["filesupload"]["savedate"] = time
            console.log(files["filesupload"]["type"]);
            id = id + 1
            console.log("lol");
            pliczki.push(files["filesupload"])
            context = {
                pliki: pliczki
            }
            // console.log(pliczki)
        } else {
            for (let i = 0; i < files['filesupload'].length; i++) {
                let time = now.getTime();
                if (files["filesupload"][i]["type"] == "image/jpeg") {
                    files["filesupload"][i]["image"] = "gfx/9055550_bxs_file_jpg_icon.png"
                } else if (files["filesupload"][i]["type"] == "image/png") {
                    files["filesupload"][i]["image"] = "gfx/7481720_png_file_format_document_icon.png"
                } else if (files["filesupload"][i]["type"] == "text/plain") {
                    files["filesupload"][i]["image"] = "gfx/3209599_file_text_txt_icon.png"
                } else {
                    files["filesupload"][i]["image"] = "gfx/9023994_question_fill_icon.png"
                }
                files["filesupload"][i]["savedate"] = time
                files["filesupload"][i]["id"] = id
                id = id + 1
                pliczki.push(files['filesupload'][i])
            }
            context = {
                pliki: pliczki
            }
        }
        // console.log(files['filesupload'][0]["path"]); // zwraca mi pierwszy plik, oraz sciezke do niego
        res.redirect("/Filemanager")
    });
});

app.get("/Filemanager", function (req, res) {

    res.render("Filemanager.hbs", context)
})

app.get("/reset", function (req, res) {
    pliczki = []
    context = {
    }
    res.render("Filemanager.hbs", context)
})

app.get("/delete", function (req, res) {
    przycisk = req.query.przycisk
    for (let i = 0; i < pliczki.length; i++) {
        if (pliczki[i]["id"] == przycisk) {
            pliczki.splice(i, 1)
            break
        }
    }
    context = {
        pliki: pliczki
    }
    res.render("Filemanager.hbs", context)
})

app.get("/download", function (req, res) {
    res.download(req.query.przycisk)
})

app.get("/info", function (req, res) {
    id_pliku = req.query.id
    let plik
    for (let i = 0; i < pliczki.length; i++) {
        if (pliczki[i]["id"] == id_pliku) {
            plik = pliczki[i]
            break
        }
    }
    res.render("Info.hbs", plik)
})



app.get("/", function (req, res) {
    res.render("Upload.hbs")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})