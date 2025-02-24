import { useContext, useEffect, useState } from 'react';
import { CounterContext } from '../context/CounterContext';

const Zoldsegek = () => {
    const [zoldsegek, setZoldsegek] = useState([]);
    const [darabszam, setDarabszam] = useState([]);
    const { szamlalo, setSzamlalo, betoltes, vasarlas, setVasarlas } =
        useContext(CounterContext);

    useEffect(() => {
        console.log(vasarlas);
        let tomb = [];
        let tombD = [];

        for (let i = 0; i < betoltes.length; i++) {
            if (betoltes[i].tipus === 'zöldség') {
                tomb.push(betoltes[i].fajta);
                let vanE = false;
                for (let j = 0; j < vasarlas.length; j++) {
                    if (
                        betoltes[i].fajta.zoldseg_nev ===
                        vasarlas[j].fajta.zoldseg_nev
                    ) {
                        tombD.push(vasarlas[j].darabszam);
                        vanE = true;
                    }
                }

                if (!vanE) tombD.push(betoltes[i].darabszam);
            }
        }

        setZoldsegek(tomb);
        setDarabszam(tombD);
    }, []);

    function csokkent(elem, i) {
        let szam = szamlalo;
        let tomb = [];
        for (let j = 0; j < zoldsegek.length; j++) {
            if (darabszam[j] > 0 && i === j) {
                tomb.push(darabszam[j] - 1);
            } else tomb.push(darabszam[j]);
        }

        setDarabszam(tomb);

        let gyZ = [];

        for (let i = 0; i < vasarlas.length; i++) {
            if (
                vasarlas[i].fajta.zoldseg_nev === elem.zoldseg_nev &&
                vasarlas[i].darabszam > 0
            ) {
                let obj = {
                    tipus: 'zöldség',
                    fajta: elem,
                    darabszam: vasarlas[i].darabszam - 1,
                };
                if (vasarlas[i].darabszam - 1 === 0) szam--;
                else gyZ.push(obj);
            } else {
                gyZ.push(vasarlas[i]);
            }
        }

        setVasarlas(gyZ);
        setSzamlalo(szam);
    }

    function novel(elem, i) {
        let szam = szamlalo;
        let tomb = [];
        for (let j = 0; j < zoldsegek.length; j++) {
            if (i === j) {
                tomb.push(darabszam[j] + 1);
            } else tomb.push(darabszam[j]);
        }

        setDarabszam(tomb);

        let gyZ = [];
        let vanE = false;

        for (let i = 0; i < vasarlas.length; i++) {
            if (vasarlas[i].fajta.zoldseg_nev === elem.zoldseg_nev) {
                let obj = {
                    tipus: 'zöldség',
                    fajta: elem,
                    darabszam: vasarlas[i].darabszam + 1,
                };
                gyZ.push(obj);
                vanE = true;
            } else {
                gyZ.push(vasarlas[i]);
            }
        }

        if (!vanE) {
            szam++;
            let obj = {
                tipus: 'zöldség',
                fajta: elem,
                darabszam: 1,
            };
            gyZ.push(obj);
        }

        setVasarlas(gyZ);
        setSzamlalo(szam);
    }

    return (
        <div className="zoldsegek-container">
            <div className="zoldsegek-kontener">
                {zoldsegek.map((elem, index) => (
                    <div
                        className="zoldseg-container"
                        key={index}
                    >
                        <img src={`/images/zoldseg/${elem.zoldseg_nev}.jpg`} />
                        <p>Zöldség neve: {elem.zoldseg_nev}</p>
                        <p>
                            Mennyiségi egység: {elem.zoldseg_mennyisegi_egyseg}
                        </p>
                        <p>Mennyiségi ár: {elem.zoldseg_mennyisegi_ar} Ft</p>
                        <div className="zoldsegek-szamlalo">
                            <span
                                className="material-symbols-outlined"
                                onClick={() => csokkent(elem, index)}
                            >
                                remove
                            </span>
                            <span className="darabszam">
                                {darabszam[index]}
                            </span>
                            <span
                                className="material-symbols-outlined"
                                onClick={() => novel(elem, index)}
                            >
                                add
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Zoldsegek;
