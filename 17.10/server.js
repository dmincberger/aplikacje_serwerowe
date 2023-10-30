const express = require("express")
const app = express()
const PORT = 3000
const path = require("path")
const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów
app.use(express.static('static'))

app.get("/index", function (req, res) {
    res.render('index01.hbs');   // nie podajemy ścieżki tylko nazwę pliku
})

app.get("/login", function (req, res) {
    res.render('login01.hbs')
})




app.listen(PORT, function () {
    console.log("Serwer jest na porcie " + PORT)
})