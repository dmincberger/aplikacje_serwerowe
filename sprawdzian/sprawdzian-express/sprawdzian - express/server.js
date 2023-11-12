const express = require("express")
const app = express()
const PORT = 3000;
app.use(express.urlencoded({
  extended: true
}));

const path = require("path")
const hbs = require('express-handlebars');

let values = []
let stars = [];

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
  defaultLayout: 'main.hbs',
}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  extname: '.hbs',
  partialsDir: "views/partials",
  helpers: {
    getPrice: function (price) {
      let list = price.toString().split(".")
      if (list[1] != undefined) {
        if (list[1].length < 2) {
          list[1] += "0";
        }
      } else {
        list[1] = "00";
      }
      return list.join(".");
    },
    getStars: function (num) {
      let string = "";
      for (let i = 0; i < num; i++) {
        string += `<img src="http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star.png" alt="cunningham">`;
      }
      return string
    },
    checkCategory: function (category, index) {
      let bool = true;
      if (index == 0) {
        values = [];
      }
      if (values.includes(category)) {
        bool = false;
      } else {
        values.push(category);
      }
      return bool
    },
    checkStars: function (num, index) {
      let bool = true;
      if (index == 0) {
        stars = [];
      }
      if (stars.includes(num)) {
        bool = false;
      } else {
        stars.push(num);
      }
      return bool
    },
    checkCorrect: function (cat1, cat2, rad1, rad2) {
      let bool1 = true;
      let bool2 = true;
      let boolFinal = false;
      if (cat2 != "none") {
        if (cat1 != cat2) {
          bool1 = false;
        }
      }

      if (rad2 != undefined) {
        if (rad1 != rad2) {
          bool2 = false;
        }
      }

      if (bool1 && bool2) {
        boolFinal = true;
      }

      return boolFinal
    },
  }
}));

app.get("/", function (req, res) {
  const context = require("./data/data.json")
  res.render("index.hbs", context)
})

app.get("/send", function (req, res) {
  let context = require("./data/data.json")
  context.catt = req.query.select;
  context.radd = req.query.radio;
  res.render("filtry.hbs", context)
})

app.use(express.static('static'))

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT)
})
