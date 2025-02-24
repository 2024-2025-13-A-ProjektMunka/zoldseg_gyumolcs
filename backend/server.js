// Szükséges CommonJS npm-csomagok beimportálása
const path = require('node:path'); // útvonal beállításokhoz

// Általunk telepített npm-csomagok
require('dotenv').config(); // környezeti változókhoz (.env állomány)
const express = require('express'); // szerveralkalmazás létrehozásához
const cors = require('cors');

// Szerveralkalmazás létrehozása
const PORT = process.env.PORT || 5000; // környezeti változó (.env állományból)
const app = express(); // szerverpéldány létrehozása

// Middleware-k
app.use(express.static(path.resolve(__dirname, 'public'))); // statikus mappa
app.use(express.json()); // body-parser beállítása, űrlap elemek feldolgozásához
app.use(cors()); // fronted-backend információcseréhez kell

// Adatbázis csatlakozás. Általunk telepített npm-csomag
const mysql = require('mysql2');

// Pool létrehozása és kiexportálása, hogy a route-oknál használni lehessen
exports.pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();

// Szerver elindítása
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// route-ok
app.use('/feltolt', require('./routes/feltoltRoutes'));
app.use('/gyumolcs-modosit', require('./routes/gyumolcsModositRoutes'));
app.use('/zoldseg-torol', require('./routes/zoldsegTorolRoutes'));
app.use('/zoldseg-leker', require('./routes/zoldsegLekerRoutes'));
app.use('/gyumolcs-leker', require('./routes/gyumolcsLekerRoutes'));
