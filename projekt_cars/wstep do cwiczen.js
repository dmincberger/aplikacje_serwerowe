const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: './db/kolekcja.db',
    autoload: true
});


// console.log("PRZED FOR: " + new Date().getMilliseconds()) // 547
// for (let i = 0; i < 3; i++) {
//     let doc = {
//         a: "a"+i,
//         b: "b"+i
//     };
//     coll1.insert(doc, function (err, newDoc) {
//         console.log("id dokumentu: " + newDoc._id, "DODANO: " + new Date().getMilliseconds()) 581, 594, 598
//     });
// }
// console.log("PO FOR: " + new Date().getMilliseconds()) // 554


coll1.findOne({ _id: '9IxBsMvCrk77Apqm' }, function (err, doc) {
    console.log("----- obiekt pobrany z bazy: ", doc["edit"])
    console.log("----- formatowanie obiektu js na format JSON: ")
    console.log(JSON.stringify(doc, null, 5))
});


// coll1.find({ }, function (err, docs) {
//     //zwracam dane w postaci JSON
//     console.log("----- tablica obiektów pobrana z bazy: \n")
//     console.log(docs)
//     console.log("----- sformatowany z wcięciami obiekt JSON: \n")
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });

// coll1.find({ a: "a1" }, function (err, docs) {
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });

// coll1.count({}, function (err, count) {
//     console.log("dokumentów jest: ", count)
// });

// coll1.count({ a: "a1" }, function (err, count) {
//     console.log("dokumentów jest: ", count)
// });

//usuwa pierwsze napotkane ktore spelnia warunek

// coll1.remove({ a: "a2" }, {}, function (err, numRemoved) {
//     console.log("usunięto dokumentów: ", numRemoved)
// });

// usuwa wszystkie ktore spelniaja warunek - {multi: true }

// coll1.remove({ a:"a1" }, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto dokumentów: ",numRemoved)
// });

// const doc = {
//     login: "aaa",
//     password: "aaa",
//     timestamp: new Date().getTime(),
// }

// coll1.insert(doc, function (err, newDoc) {
//     console.log(`ID nowo dodanego dokumentu:${newDoc._id}`)
// })
