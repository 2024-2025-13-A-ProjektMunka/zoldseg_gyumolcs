import { useContext, useEffect, useState } from 'react';
import { CounterContext } from '../context/CounterContext';

const Cart = () => {
    const [vegosszeg, setVegosszeg] = useState(0);
    const { setSzamlalo, vasarlas, setVasarlas } = useContext(CounterContext);

    useEffect(() => {
        // console.log(vasarlas);
        let osszeg = 0;
        for (let i = 0; i < vasarlas.length; i++) {
            if (vasarlas[i].tipus === 'zöldség') {
                osszeg +=
                    vasarlas[i].darabszam *
                    vasarlas[i].fajta.zoldseg_mennyisegi_ar;
            } else {
                osszeg +=
                    vasarlas[i].darabszam *
                    vasarlas[i].fajta.gyumolcs_mennyisegi_ar;
            }
        }
        setVegosszeg(osszeg);
    }, []);

    const fizetes = () => {
        setVasarlas([]);
        setSzamlalo(0);
        setVegosszeg(0);
    };

    return (
        <div className="kosar-container">
            <div className="kosar-kontener">
                {vasarlas.map((elem, index) => (
                    <div
                        className="kosar-elem"
                        key={index}
                    >
                        <h1>
                            {elem.tipus === 'zöldség'
                                ? elem.fajta.zoldseg_nev
                                : elem.fajta.gyumolcs_nev}
                        </h1>
                        {elem.tipus === 'zöldség' ? (
                            <div>
                                <img
                                    src={`/images/zoldseg/${elem.fajta.zoldseg_nev}.jpg`}
                                />
                                <p>
                                    Mennyiségi egység:{' '}
                                    {elem.fajta.zoldseg_mennyisegi_egyseg}
                                </p>
                                <p>
                                    Mennyiségi ár:{' '}
                                    {elem.fajta.zoldseg_mennyisegi_ar} Ft
                                </p>
                                <p>Mennyiség: {elem.darabszam}</p>
                            </div>
                        ) : (
                            <div>
                                <img
                                    src={`/images/gyumolcs/${elem.fajta.gyumolcs_nev}.jpg`}
                                />
                                <p>
                                    Mennyiségi egység:{' '}
                                    {elem.fajta.gyumolcs_mennyisegi_egyseg}
                                </p>
                                <p>
                                    Mennyiségi ár:{' '}
                                    {elem.fajta.gyumolcs_mennyisegi_ar} Ft
                                </p>
                                <p>Mennyiség: {elem.darabszam}</p>
                            </div>
                        )}
                    </div>
                ))}
                <div className="kosar-elem">
                    <h1>Fizetendő: {vegosszeg} Ft</h1>
                    <button onClick={fizetes}>Fizetés</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
