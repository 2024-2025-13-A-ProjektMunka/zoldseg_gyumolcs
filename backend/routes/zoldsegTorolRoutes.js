// Szükséges CommonJS npm-csomagok beimportálása
const express = require('express');
const { pool } = require('../server');

// Szerver szerepkör delegálása route-okra
const router = express.Router();

// gyumolcs-modosit route kezelése
router.delete('/', async (req, res) => {
    const { nev } = req.body;

    try {
        await pool.query(`DELETE FROM zoldsegek WHERE zoldseg_nev = '${nev}';`);

        return res.status(201).json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

module.exports = router;
