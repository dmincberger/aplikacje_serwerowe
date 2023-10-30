const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const hbs = require('express-handlebars')
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', hbs({ defaultlayout: 'main.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('static'))

const Datastore = require('nedb')

const coll2 = new Datastore({
    filename: 'serwer01.db',
    autoload: true
});


const context = {

}

app.get("/", function (req, res) {
    res.render('index01.hbs', context)
})

app.get("/login", function (req, res) {
    let login = req.query.login
    let password = req.query.password
    let timestamp = new Date().getTime()
    const doc = { login: login, password: password, timestamp: timestamp }
    coll2.insert(doc, function (err, newDoc) {
        console.log(`ID nowego docu w bazie danych: ${newDoc._id}`)
        coll2.find({}, function (err, docs) {
            let context = {
                x: docs
            }
            res.render('index01.hbs', context)
        });
    })
})

app.listen(PORT, function () {
    console.log("Serwer jest na porcie " + PORT)
})