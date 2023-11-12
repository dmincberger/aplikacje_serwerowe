const express = require("express")
const app = express()
const PORT = 3000;

app.use(express.json());
const path = require("path")
const hbs = require('express-handlebars');
const { log } = require('console');



app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.set('view-engine', 'hbs'); // określenie nazwy silnika szablonów

app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
}));


app.get("/", function (req, res) {
    const context = require("./data/data12.json")
    res.render('index.hbs', context);
})


app.use(express.static('static'))


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})