const express = require('express')
const app = express()
app.use(express.static('static'))
app.use(express.json())
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));


const PORT = 3000
const hbs = require('express-handlebars');
const path = require('path')
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');
const Datastore = require('nedb')
const coll1 = new Datastore({
    filename: './db/kolekcja.db',
    autoload: true
});

app.get("/", function (req, res) {
    res.render('index.hbs')
})

app.get("/Addcar", function (req, res) {
    res.render('AddCar.hbs')
})

app.post("/Addcar", function (req, res) {
    let formularz = req.body.przycisk
    if (formularz) {
        let ubezpieczenie = req.body.ubezpieczenie
        let benzyna = req.body.benzyna
        let uszkodzenie = req.body.uszkodzenie
        let naped = req.body.naped
        console.log(req.query.przycisk)
        const doc = {
            ubezpieczenie: ubezpieczenie == undefined ? "NIE" : "TAK",
            benzyna: benzyna == undefined ? "NIE" : "TAK",
            uszkodzenie: uszkodzenie == undefined ? "NIE" : "TAK",
            naped: naped == undefined ? "NIE" : "TAK"
        }
        coll1.insert(doc, function (err, newDoc) {
            // console.log("dodano dokument (obiekt):")
            // console.log(newDoc)
            // console.log("losowe id dokumentu: " + newDoc._id)
            const context = {
                id_auta: newDoc._id
            }
            res.render('AddCar.hbs', context)
        });
    }
    // console.log(naped) on jesli przesle, undefined jesli nie zaznacze

})

app.get("/Listcars", function (req, res) {
    coll1.find({}, function (err, docs) {
        let context = {
            x: docs
        }
        console.log(context)
        res.render('CarsList.hbs', context)
    });
})

app.get("/deleteCars", function (req, res) {
    coll1.find({}, function (err, docs) {
        let context = {
            x: docs
        }
        console.log(context)
        res.render('DeleteCar.hbs', context)
    });
})

app.listen(PORT, function () {
    console.log(`Serwer dziala na porcie ${PORT}`)
})