// Szükséges CommonJS npm-csomagok beimportálása
const express = require('express');
const { pool } = require('../server');

// Szerver szerepkör delegálása route-okra
const router = express.Router();

// gyumolcs-modosit route kezelése
router.put('/', async (req, res) => {
    try {
        const { nev, ujAr } = req.body;

        await pool.query(
            `UPDATE gyumolcsok SET gyumolcs_mennyisegi_ar = ${ujAr} WHERE gyumolcs_nev = '${nev}';`
        );

        return res.status(201).json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});

module.exports = router;
