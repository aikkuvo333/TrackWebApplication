# TRACK Web Application
<img src="Näyttökuva 2021-12-14 kello 19.02.51.png" alt="About track sivustonäkymä">
Demo web application for TRACK calorie counter idea. The idea of our web application is to count calories by adding the name of consumed food and the amount in grams. The application will count the desired calorie intake for the day based by users registeration information about gender and activity level. The page also includes recipes and training videos.

The application was made with Vue.

# Contributors
This web application has been made at Metropolia University of Applied Sciences by Tieto- & Viestintätekniikka students <b>Aivan Vo</b>, <b>Olli Ruuskanen</b> and <b>Elsa Rajala</b>.


# REST- rajapinnan kutsut
1. app.post("/api/createUser")
   <br>Kuvaus: Käyttäjän luonti
   <br> Hakee käyttäjän syöttämät rekisteröitymiseen vaadittavat tiedot ja tarkistaa syötteiden kriteerit. Käyttäjätiedot ja virheet on JSON-muodossa.
   Tarkistaa sen jälkeen ettei tietokannasta löydy jo saman nimistä käyttäjätunnusta. Mikäli ei löydy, niin käyttäjätietokantaan luodaan uusi rivi annetuilla tiedoilla.


2. app.get("/api/signIn")
   <br>Kuvaus: Käyttäjän sisäänkirjautuminen
   <br> Haetaan käyttäjätunnuksen avulla tiedot tietokannasta JSON-muodossa. Tarkistetaan, että kyseinen käyttäjätunnus on olemassa, mikäli käyttäjätunnus löytyy, palautetaan tiedot JSON-muodossa. Mikäli tunnusta ei löydy, palautetaan tyhjä JSON.
   

3. app.get("/api/getFood")
   <br>Kuvaus: Tallennettujen ruokien haku tietokannasta
   <br> Hakee tietokannasta ruokataulukosta sillä hetkellä sisäänkirjautuneen käyttäjätunnuksen ja käyttäjän valitseman päivän perusteella ruuat. Palauttaa ruuat JSON-muodossa.


4. app.post("/api/addFood")
   <br>Kuvaus: Ruokien lisäys tietokantaan
   <br> Hakee sillä hetkellä sisäänkirjautuneen käyttäjän rekiströidessä annetut tiedot. Lisää sen jälkeen tiedo JSON-muodossa tietokannan ruokataulukkoon.


## Project setup
```
node *path/to/server.js*
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Käytettävissä oleva paikallisen tietokannan sisältö
Tietokannan luonti ja käyttäjätaulukon luonti
```
CREATE DATABASE IF NOT EXISTS `login` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `login`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `activity` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

Ruokataulukon luonti
```
CREATE TABLE IF NOT EXISTS `foods` (
  `username` varchar(50) NOT NULL,
  `calories`  INT(20) NOT NULL,
  `foodname` varchar(50) NOT NULL,
  `date` date NOT NULL
);
```


