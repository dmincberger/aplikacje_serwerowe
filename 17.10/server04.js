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
    subject: "ćwiczenie 4 - dane z tablicy, select",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render("index04.hbs", context)
    console.log("--- cały obiekt context")
    console.log(context)
    console.log("--- tablica fields z obiektu context")
    console.log(context.fields[0])
})

app.get("/wybor", function (req, res) {
    const wybor = req.query.sel
    console.log(wybor);
    switch (wybor) {
        case "title":
            let c = {
                dane: []
            }
            for (let i = 0; i < 2; i++) {
                c.dane.push(context.books[i]["title"])
                console.log(c)
            }

            res.render("wybor04.hbs")
            break;
    }
})

app.listen(PORT, function () {
    console.log("Dziala na " + PORT)
})