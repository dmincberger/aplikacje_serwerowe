const express = require('express')
const app = express()
app.use(express.static('static'))

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



app.listen(PORT, function () {
    console.log(`Serwer dziala na porcie ${PORT}`)
})