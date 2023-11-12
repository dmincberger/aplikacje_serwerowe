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
        const doc = {
            ubezpieczenie: ubezpieczenie == undefined ? "NIE" : "TAK",
            benzyna: benzyna == undefined ? "NIE" : "TAK",
            uszkodzenie: uszkodzenie == undefined ? "NIE" : "TAK",
            naped: naped == undefined ? "NIE" : "TAK",
            edit: null
        }
        coll1.insert(doc, function (err, newDoc) {
            const context = {
                id_auta: newDoc._id
            }
            res.render('AddCar.hbs', context)
        });
    }

})

app.get("/Listcars", function (req, res) {
    coll1.find({}, function (err, docs) {
        let context = {
            x: docs
        }
        res.render('CarsList.hbs', context)
    });
})

app.get("/deleteCars", function (req, res) {
    coll1.find({}, function (err, docs) {
        let context = {
            x: docs,
            wiadomosc: "Wybierz auta/auto do usuniecia:"
        }
        res.render('DeleteCar.hbs', context)
    });
})



app.get("/Usunauto", function (req, res) {
    console.log(req.query.lol)
    id = req.query.przycisk_auta
    coll1.remove({ _id: id }, {}, function (err, numRemoved) {

        ("Usunięto dokumenty: ", numRemoved)
    })
    coll1.find({}, function (err, docs) {
        let context = {
            x: docs,
            wiadomosc: "Usunięto auto"
        }
        res.render('DeleteCar.hbs', context)
    });
})

app.get("/Usunwszystkie", function (req, res) {
    coll1.remove({}, { multi: true }, function (err, numRemoved) {
        ("usunięto wszystkie dokumenty: ", numRemoved)
        context = {
            wiadomosc: "Usunięto wszystkie auta!"
        }
        res.render("DeleteCar.hbs", context)
    });
})

app.get("/Usunauta", function (req, res) {
    let count = -1
    for (let key in req.query) {
        coll1.remove({ _id: key }, {}, function (err, numRemoved) {
            count = count + 1
        })
    }
    coll1.find({}, function (err, docs) {
        let context = {
            x: docs,
            count: count,
            wiadomosc: count == 0 ? "Wybierz przynajmniej jedno auto" : "Usunięto "
        }
        res.render('DeleteCar.hbs', context)
    });
})

app.get("/Editcars", function (req, res) {
    coll1.find({}, function (err, docs) {
        coll1.findOne({ edit: "TAK" }, function (err, doc) {
            console.log(doc)
            if (doc != null) {
                coll1.update(
                    { _id: doc._id, },
                    { $set: { edit: null } },
                    {},
                    function (err, numReplaced) {
                    }
                )
            }
        })
        let context = {
            x: docs,
        }
        res.render('EditCar.hbs', context)
    })
})

app.get("/Updatecar", function (req, res) {
    let update = req.query.Updated
    update = Object.values(update).join("")
    coll1.update(
        { _id: update, },
        { $set: { edit: "TAK" } },
        {},
        function (err, numReplaced) {
        }
    )
    coll1.find({}, function (err, docs) {
        coll1.findOne({ edit: "TAK" }, function (err, doc) {
            if (doc != null) {
                coll1.update(
                    { _id: doc._id, },
                    { $set: { edit: null } },
                    {},
                    function (err, numReplaced) {
                    }
                )
            }
        })
        let context = {
            x: docs
        }
        res.render('EditCar.hbs', context)
    })
})

app.get("/Confirmupdate", function (req, res) {
    let update = req.query.Update
    let ubezpieczenie = req.query.ubezpieczenie
    let benzyna = req.query.benzyna
    let uszkodzenie = req.query.uszkodzenie
    let naped = req.query.naped
    update = Object.values(update).join("")
    console.log(update)
    coll1.update(
        { _id: update, },
        { $set: { edit: null, ubezpieczenie: ubezpieczenie, benzyna: benzyna, uszkodzenie: uszkodzenie, naped: naped } },
        {},
        function (err, numReplaced) {
        }
    )
    coll1.find({}, function (err, docs) {
        coll1.findOne({ edit: "TAK" }, function (err, doc) {
            console.log(doc)
            if (doc != null) {
                coll1.update(
                    { _id: doc._id, },
                    { $set: { edit: null } },
                    {},
                    function (err, numReplaced) {
                    }
                )
            }
        })
        let context = {
            x: docs,
        }
        res.render('EditCar.hbs', context)
    })

})

app.listen(PORT, function () {
    (`Serwer dziala na porcie ${PORT}`)
})

