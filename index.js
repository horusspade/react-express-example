const express = require('express');
const path = require('path');
const lol = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/soloqdemon?api_key=RGAPI-921eeea1-1294-4005-81cb-b45e25945622";
const lolm = "https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/70793?api_key=RGAPI-921eeea1-1294-4005-81cb-b45e25945622";

const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser')

loldata = {};
loldatamatch = {};
request = require('request');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item781", "item2", "item3"];
    res.json(list);

    });

// app.get('/api/lol', (req,res) => {
// fetch(lol)
//   .then(response => response.json())
//         .then(data => console.log(data))


//});
app.get('/api/lol', (req, res) => {
    var data = loldata;
    res.json(data);
    console.log("lol data sent")
});
app.get('/api/lolm', (req, res) => {
    var data = loldatamatch;
    res.json(data.matches[0]);
    console.log("lol datamatch sent")
});

fetch(lolm)
    .then(response => response.json())
    .then(data => console.log(loldatamatch = data))

fetch(lol)
    .then(response => response.json())
    .then(data => loldata = data)

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);