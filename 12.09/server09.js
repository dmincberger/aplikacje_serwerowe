const express = require("express")
const app = express()
const PORT = 3000;

app.get('/', function (req, res) {
    console.log(req.query)
    console.log(req.query.num)
    console.log(req.query.bg)

});

// start

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})