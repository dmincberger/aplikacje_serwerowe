const express = require('express')
const app = express()
const PORT = 3000
app.use(express.static('static'))
app.use(express.json())
const path = require('path')

const hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
    defaultLayout: 'main.hbs',
    helpers: {
        shortTitle: function (title) {
            return title.substring(0, 10) + "...";
        },
        bigTitle: function (title) {
            tabela = title.split(" ")
            for (let i = 0; i < tabela.length; i++) {
                tabela[i] = tabela[i].charAt(0).toUpperCase() + tabela[i].slice(1) + " "
                console.log(tabela[i])
            }
            title = tabela.join("")
            console.log(title)
            return title
        },
        minusy: function (title) {
            tabela = title.split("")
            for (let i = 0; i < tabela.length; i++) {
                tabela[i] = tabela[i] + "-"
            }
            title = tabela.join("")
            return title
        }

    }
}));
app.set('view engine', 'hbs');

const context = require('./dane.json')

app.get("/", function (req, res) {
    res.render('view4.hbs', context)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})