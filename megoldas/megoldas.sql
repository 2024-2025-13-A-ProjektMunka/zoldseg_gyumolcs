-- 1. feladat: Adatbázis létrehozása
CREATE DATABASE zoldseges
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

-- 2. feladat: zoldsegek tábla létrehozása
CREATE TABLE zoldsegek (
	zoldsegID int(11) NOT NULL AUTO_INCREMENT,
	zoldseg_nev varchar(100) NOT NULL, 
	zoldseg_mennyisegi_egyseg varchar(20) NOT NULL, 
	zoldseg_mennyisegi_ar int(11) NOT NULL,
	PRIMARY KEY(zoldsegID) 
);

-- 3. feladat: gyumolcsok tábla létrehozása
CREATE TABLE gyumolcsok (
	gyumolcsID int(11) NOT NULL AUTO_INCREMENT,
	gyumolcs_nev varchar(100) NOT NULL, 
	gyumolcs_mennyisegi_egyseg varchar(20) NOT NULL, 
	gyumolcs_mennyisegi_ar int(11) NOT NULL, 
	PRIMARY KEY(gyumolcsID) 
);

-- 4. feladat: vasarlasok tábla létrehozása
CREATE TABLE vasarlasok (
    vasarlasID int(11) NOT NULL AUTO_INCREMENT,
    zoldseg_ID int(11),
    zoldseg_mennyiseg int(11) NOT NULL,
    gyumolcs_ID int(11),
    gyumolcs_mennyiseg int(11) NOT NULL,
    PRIMARY KEY (vasarlasID)
);

-- 5. feladat: táblák összekötése
ALTER TABLE vasarlasok
ADD FOREIGN KEY (zoldseg_ID) REFERENCES zoldsegek(zoldsegID);

ALTER TABLE vasarlasok
ADD FOREIGN KEY (gyumolcs_ID) REFERENCES gyumolcsok(gyumolcsID);

-- 12. feladat: gyumolcsok tábla feltöltése
INSERT INTO gyumolcsok (gyumolcs_nev, gyumolcs_mennyisegi_egyseg, gyumolcs_mennyisegi_ar) VALUES (?, ?, ?);

-- 15. feladat: gyumolcsok tábla módosítása
UPDATE gyumolcsok SET gyumolcs_mennyisegi_ar = ${ujAr} WHERE gyumolcs_nev = '${nev}';

-- 16. feladat: zoldsegek tábla módosítása
DELETE FROM zoldsegek WHERE zoldseg_nev = '${nev}';