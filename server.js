const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const url = require("url");
const { body, validationResult } = require('express-validator');

const app = express();
app.use(bodyParser());

const connection = mysql.createConnection({ //tietokanta yhteys
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "login"
});

app.post("/api/createUser",         //käyttäjän luonti
    body('username').isLength({ min:4, max:12}),
    body('password').isLength({ min:4, max:12}),
    (req, res) => {

    let username = req.body.username; //clientista saadut kirjautumistiedot
    let password = req.body.password;
    let gender = req.body.gender;
    let activity = req.body.activity;

    let data = { // laitetaan json muotoon
        data:{
            loggedIn: false,
            username: null,
            password: null,
            gender: null,
            activity: null
        },
        errors:{
            nameError: null,
            passwordError: null,
        }}

        let isUsed = false;

        const errors = validationResult(req); // tarkistetaan virheet

        if(!errors.isEmpty()){
            if(username.length < 4 || username.length >12)
                data.errors.nameError = "Username must be 4-12 characters long";
            if(password.length < 4 || password.length >12)
                data.errors.passwordError = "Password  must be 4-12 characters long";
            isUsed = true;
            return res.send(data);
        }

    if(!isUsed){

        connection.query("SELECT username FROM accounts WHERE username = ? ", [username], function (err, result){
            console.log(result)
            if(result[0] !== undefined){ //katsotaan löytyykö käyttäjätunnusta jo

                if(data.errors.nameError === null){
                    data.errors.nameError = "Username is not available";
                } else {
                    data.errors.nameError += " and username is not available";
                }
                isUsed = true;
                return res.send(data); // jos käyttäjä tunnus löytyy plautetaan virhe
            }
        });
    }



     //jos käyttäjää ei ole olemassa niin luodaan se

            connection.query("insert INTO accounts (username, password, gender, activity) VALUES (?, ?, ?, ?)",
                [username, password, gender, activity], function (err, result) {
                    if (err)
                        throw err;

                    data.data.loggedIn = true;
                    data.data.username = username;
                    data.data.password = password;
                    data.data.gender = gender;
                    data.data.activity = activity;
                    if(!isUsed) {
                        res.send(data); // palautetaan luodut tiedot
                    }
                });
});
app.post("/api/addFood",(req, res) => {

    let username = req.body.username; //tiedot client:ista
    let foodname = req.body.foodname;
    let calories = req.body.calories;
    let date = req.body.date;


    connection.query("insert INTO foods (username, calories, foodname, date) VALUES (?, ?, ?, ?)",
        [username, calories , foodname, date], function (err, result) {     //lisätään ruoka


            if (err)
                throw err;

            res.send(JSON.stringify(result)); //palautetaan tiedot
        });

});
app.get("/api/getFood", (req, res) => {

    let u = url.parse(req.url, true).query;

    //haetaan ruuat
    connection.query("SELECT * FROM foods WHERE username = ? AND date = ?", [u.username, u.date], function(err, results) {


        if (err)
            throw err;

        //palautetaan ruuat client:ille
        res.send(JSON.stringify(results));

    });
});

app.get("/api/signIn", (req, res) => {


    let u = url.parse(req.url, true).query;

    //haetaan käyttäjätunnusta tietokannasta
    connection.query("SELECT * FROM accounts WHERE username = ?", [u.username], function(err, results){

        let result = { // tiedot json muodossa
            data:{
            loggedIn: false,
            username: null,
            password: null,
            gender: null,
            activity: null
        }};

        if(results[0] !== undefined) // tarkistetaan että käyttäjä tunnus on olemassa
        {
            if (results[0].password === u.password) { // jos kirjautumis salasana vastaa käyttäjän salasanaa
                result.data.loggedIn = true;    //palautetaan käyttäjän tiedot
                result.data.password = results[0].password;
                result.data.username = results[0].username;
                result.data.gender = results[0].gender;
                result.data.activity = results[0].activity;
            }
        }
        res.send(result); // palautetaan tiedot jos kirjautunut tai tyhjä json jos ei.
    });
});


connection.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to MySql server")
});

app.listen(3000, () => {
    console.log("Server started ... port 3000");
});