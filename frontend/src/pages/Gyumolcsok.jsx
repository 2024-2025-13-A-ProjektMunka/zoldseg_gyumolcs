import { useContext, useEffect, useState } from 'react';
import { CounterContext } from '../context/CounterContext';

const Gyumolcsok = () => {
    const [gyumolcsok, setGyumolcsok] = useState([]);
    const [darabszam, setDarabszam] = useState([]);
    const { szamlalo, setSzamlalo, betoltes, vasarlas, setVasarlas } =
        useContext(CounterContext);

    useEffect(() => {
        console.log(vasarlas);
        let tomb = [];
        let tombD = [];

        for (let i = 0; i < betoltes.length; i++) {
            if (betoltes[i].tipus === 'gyümölcs') {
                tomb.push(betoltes[i].fajta);
                let vanE = false;
                for (let j = 0; j < vasarlas.length; j++) {
                    if (
                        betoltes[i].fajta.gyumolcs_nev ===
                        vasarlas[j].fajta.gyumolcs_nev
                    ) {
                        tombD.push(vasarlas[j].darabszam);
                        vanE = true;
                    }
                }

                if (!vanE) tombD.push(betoltes[i].darabszam);
            }
        }

        setGyumolcsok(tomb);
        setDarabszam(tombD);
    }, []);

    function csokkent(elem, i) {
        let szam = szamlalo;
        let tomb = [];
        for (let j = 0; j < gyumolcsok.length; j++) {
            if (darabszam[j] > 0 && i === j) {
                tomb.push(darabszam[j] - 1);
            } else tomb.push(darabszam[j]);
        }

        setDarabszam(tomb);

        let gyT = [];

        for (let i = 0; i < vasarlas.length; i++) {
            if (
                vasarlas[i].fajta.gyumolcs_nev === elem.gyumolcs_nev &&
                vasarlas[i].darabszam > 0
            ) {
                let obj = {
                    tipus: 'gyümölcs',
                    fajta: elem,
                    darabszam: vasarlas[i].darabszam - 1,
                };
                if (vasarlas[i].darabszam - 1 === 0) szam--;
                else gyT.push(obj);
            } else {
                gyT.push(vasarlas[i]);
            }
        }

        setVasarlas(gyT);
        setSzamlalo(szam);
    }

    function novel(elem, i) {
        let szam = szamlalo;
        let tomb = [];
        for (let j = 0; j < gyumolcsok.length; j++) {
            if (i === j) {
                tomb.push(darabszam[j] + 1);
            } else tomb.push(darabszam[j]);
        }

        setDarabszam(tomb);

        let gyT = [];
        let vanE = false;

        for (let i = 0; i < vasarlas.length; i++) {
            if (vasarlas[i].fajta.gyumolcs_nev === elem.gyumolcs_nev) {
                let obj = {
                    tipus: 'gyümölcs',
                    fajta: elem,
                    darabszam: vasarlas[i].darabszam + 1,
                };
                gyT.push(obj);
                vanE = true;
            } else {
                gyT.push(vasarlas[i]);
            }
        }

        if (!vanE) {
            szam++;
            let obj = {
                tipus: 'gyümölcs',
                fajta: elem,
                darabszam: 1,
            };
            gyT.push(obj);
        }

        setVasarlas(gyT);
        setSzamlalo(szam);
    }

    return (
        <div>
            <div className="gyumolcsok-container">
                <div className="gyumolcsok-kontener">
                    {gyumolcsok.map((elem, index) => (
                        <div
                            className="gyumolcs-container"
                            key={index}
                        >
                            <img
                                src={`/images/gyumolcs/${elem.gyumolcs_nev}.jpg`}
                            />
                            <p>Gyümölcs neve: {elem.gyumolcs_nev}</p>
                            <p>
                                Mennyiségi egység:{' '}
                                {elem.gyumolcs_mennyisegi_egyseg}
                            </p>
                            <p>
                                Mennyiségi ár: {elem.gyumolcs_mennyisegi_ar} Ft
                            </p>
                            <div className="gyumolcsok-szamlalo">
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
        </div>
    );
};

export default Gyumolcsok;
