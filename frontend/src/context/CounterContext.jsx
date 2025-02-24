import { useState, createContext, useEffect } from 'react';

export const CounterContext = createContext();

const ContextProvider = (props) => {
    const [szamlalo, setSzamlalo] = useState(0);
    const [betoltes, setBetoltes] = useState([]);
    const [vasarlas, setVasarlas] = useState([]);

    useEffect(() => {
        const leker = async () => {
            let tomb = [];
            try {
                const response = await fetch(
                    'http://localhost:5000/zoldseg-leker'
                );

                const valasz = await response.json();

                if (response.ok) {
                    for (let i = 0; i < valasz.response[0].length; i++) {
                        tomb.push({
                            tipus: 'zöldség',
                            fajta: valasz.response[0][i],
                            darabszam: 0,
                        });
                    }
                } else {
                    window.alert(valasz.msg);
                }
            } catch (error) {
                console.log(error.message);
            }

            try {
                const response = await fetch(
                    'http://localhost:5000/gyumolcs-leker'
                );

                const valasz = await response.json();

                if (response.ok) {
                    // let tomb = [];
                    for (let i = 0; i < valasz.response[0].length; i++) {
                        tomb.push({
                            tipus: 'gyümölcs',
                            fajta: valasz.response[0][i],
                            darabszam: 0,
                        });
                    }
                } else {
                    window.alert(valasz.msg);
                }
            } catch (error) {
                console.log(error.message);
            }

            setBetoltes(tomb);
        };

        leker();
    }, []);

    return (
        <CounterContext.Provider
            value={{
                szamlalo,
                setSzamlalo,
                betoltes,
                setBetoltes,
                vasarlas,
                setVasarlas,
            }}
        >
            {props.children}
        </CounterContext.Provider>
    );
};

export default ContextProvider;
