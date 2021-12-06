const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const fs = require('fs');
// const formData = require("express-form-data");

app.use(express.static('static'));
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
    fs.writeFile('database/database.json', function(err, data) {
        if (err) res.send(err)
        res.send(data)
    })
})




// Oprettelse af annoncer til databasen. Den danner et unikt ID, hvor pris og produktnavn selv skal indtastes af brugeren
app.post('/products', (req, res) => {

    let dataArray = JSON.parse(fs.readFileSync('database/database.json'))

    dataArray.push(req.body);

    fs.writeFile('database/database.json', JSON.stringify(dataArray, null, 4), err => {
       if (err) res.send(err)
       res.send({msg: "Succes!"})
    })
})


// Opdatering af annoncer i databasefilen. Den overrider produktnavn og pris, men ID forbliver det samme. Måden man ændrer værdierne på, er ved at bruge ID
app.put('/products', (req, res) => {
    let dataArray = JSON.parse(fs.readFileSync("database/database.json"))
    let { produktnavn, pris } = req.body;

    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id == req.body.id){
            dataArray[i].produktnavn = produktnavn;
            dataArray[i].pris = pris;
        }
    }

    fs.writeFile('database/database.json', JSON.stringify(dataArray, null, 4), err => {
        if(err) res.send(err)
        res.status(200).json({msg: "Opdatering gennemført"})
    });
});


// Slettelse af annonce ud fra ID. Det vil sige det ID der bliver indtastet bliver slettet.
app.delete('/products/:id', (req, res) => {

    let dataArray = JSON.parse(fs.readFileSync('database/database.json'))

    for (let i = 0; i < dataArray.length; i++) {

        if(dataArray[i].id == req.params.id) {
            dataArray.splice(i, 1)

            fs.writeFile('database/database.json', JSON.stringify(dataArray, null, 4), err => {
                if(err) res.send(err)
                    res.status(200).json({
                msg: "Din vare er slettet"
                })
            })
        }
    }

})



app.get('/products', (req, res) => {
    fs.readFile('database/database.json', function (err, data) {
        if(err) res.send(err)
        res.send(data)
    })
});


// Se om serveren kører (ren formalia)
app.listen(port, () => {
    console.log('Serveren kører')
})




module.exports = app