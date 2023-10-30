const express = require("express")
const app = express()
const PORT = 3000;


// start

app.get("/", function (req, res) {
    let auta = ["audi", "opel", "francuz", "duży fiat", "mercedes", "małe fajne autko"]
    console.log(auta)
    res.send(forma)
})

app.get("/autka", function (req, res) {

})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})