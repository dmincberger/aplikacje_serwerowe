const express = require("express")
const app = express()
const PORT = 3000;
const bodyParser = require("body-parser")

app.use(express.json());

const path = require("path")

//app.use(bodyParser.urlencoded({ extended: true }));

// start

app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/server02.html"))
})

app.post("/Kalk", function (req, res) {
    console.log(req.body)
    // console.log(req.body.num1) przesyła mi wartość num1 z htmlu
    let dict = {}
    let num1 = parseInt(req.body.num1)
    let num2 = parseInt(req.body.num2)
    let wynik = 0
    let array = new Array()
    switch (req.body.Wyb) {
        case "Dodawanie":
            wynik = num1 + num2
            dict["message"] = "Wynik dodawania dwoch elementow to: ",
                dict["wynik"] = wynik
            res.header("content-type", "application/json")
            res.send(JSON.stringify(dict, null, 5))
            break;
        case "Odejmowanie":
            wynik = num1 - num2
            dict["message"] = "Wynik Odejmowania dwoch elementow to: ",
                dict["wynik"] = wynik
            res.header("content-type", "application/json")
            res.send(JSON.stringify(dict, null, 5))
            break;
        case "Dzielenie":
            wynik = num1 / num2
            dict["message"] = "Wynik dzielenia dwoch elementow to: ",
                dict["wynik"] = wynik
            res.header("content-type", "application/json")
            res.send(JSON.stringify(dict, null, 5))
            break;
        case "Mnozenie":
            wynik = num1 * num2
            dict["message"] = "Wynik mnozenia dwoch elementow to: ",
                dict["wynik"] = wynik
            res.header("content-type", "application/json")
            res.send(JSON.stringify(dict, null, 5))
            break;
        case "Wszystko":

            wynik = num1 + num2
            array.push({ "message": "Wynik dodawania dwoch elementow to: ", "wynik": wynik })

            wynik = num1 - num2
            array.push({ "message": "Wynik odejmowania dwoch elementow to: ", "wynik": wynik })

            wynik = num1 / num2
            array.push({ "message": "Wynik dzielenia dwoch elementow to: ", "wynik": wynik })

            wynik = num1 * num2
            array.push({ "message": "Wynik mnozenia dwoch elementow to: ", "wynik": wynik })

            res.header("content-type", "application/json")
            res.send(JSON.stringify(array, null, 5))
            break;
    }

}
)

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})