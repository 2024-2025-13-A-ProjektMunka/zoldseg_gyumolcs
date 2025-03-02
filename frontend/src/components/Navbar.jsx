import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from '../context/CounterContext';

const Navbar = () => {
    const { szamlalo } = useContext(CounterContext);

    let szam = 0;

    const becsuk = () => {
        let navbar_elrejt = document.querySelector('.navbar-elrejt');
        let felfedes = document.querySelector('.felfedes');
        if (szam % 2 === 0) {
            navbar_elrejt.classList.add('felfedes');
            navbar_elrejt.classList.remove('navbar-elrejt');
        } else {
            felfedes.classList.add('navbar-elrejt');
            felfedes.classList.remove('felfedes');
        }
        szam++;
    };

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <span className="material-symbols-outlined">grass</span>
            </div>
            <div className="navbar-kategoriak">
                <div className="navbar-kosar">
                    <Link to="/cart">
                        <span className="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </Link>
                    <span className="navbar-szamlalo">{szamlalo}</span>
                </div>
                <div className="navbar-elrejt">
                    <Link to="/">Home</Link>
                    <Link to="/zoldsegek">Zöldségek</Link>
                    <Link to="/gyumolcsok">Gyümölcsök</Link>
                </div>
                <span
                    className="material-symbols-outlined becsuk"
                    onClick={becsuk}
                >
                    menu
                </span>
            </div>
        </div>
    );
};

export default Navbar;
