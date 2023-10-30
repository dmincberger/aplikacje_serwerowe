const express = require("express")
const app = express()
const PORT = 3000
app.use(express.static("static"))
const path = require("path")
const hbs = require('express-handlebars');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
const context = {
    subject: "ćwiczenie 3 - dane z tablicy obiektów",
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Homo Deus", author: "Yuval Noah Harari", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render("index03.hbs", context)
})

app.listen(PORT, function () {
    console.log("Dziala na " + PORT)
})