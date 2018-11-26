const express = require('express');
const path = require('path');
const key ="RGAPI-e476622f-e34f-446a-b929-d2739e2a9fb7";
const lol = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/soloqdemon?api_key=${key}`;
const lolm = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/70793?api_key=${key}`;
const testchamp = "http://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/champion/Diana.json"
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
let dad = getLol();

loldata = {};
loldatamatch = {};
lolchamp={};
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
    
    console.log(loldata);
    res.json(loldata);
    console.log("lol data sent")
});

// app.get('/api/lol', (req, res) => {
//     var data = loldata;
//     res.json(data);
//     console.log("lol data sent")
// });

app.get('/api/lolm', (req, res) => {
    var data = loldatamatch;
    res.json(data.matches[0]);
    console.log("lol datamatch sent")
});

app.get('/api/lolc', (req, res) => {
    var json_data = lolchamp;
    const arr = Object.keys(json_data).map((key) => [key, json_data[key]]);
    const arr2 = Object.keys(json_data);
    res.json(arr);
    console.log("lol diana sent")
    console.log(arr2)
    
});

fetch(lolm)
    .then(response => response.json())
    .then(data => loldatamatch = data)

async function getLol(){
    
    let response = await fetch(lol);
    let summoner = await response.json();
    loldata =summoner;   
} 
getLol();

// fetch(lol)
//     .then(response => response.json())
//     .then(data => loldata = data)
    
 fetch(testchamp)
    .then(response => response.json())
    .then(data => console.log(lolchamp = data.data.Diana.stats))


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);