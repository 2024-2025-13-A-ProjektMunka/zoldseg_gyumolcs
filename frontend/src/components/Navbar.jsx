import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from '../context/CounterContext';

const Navbar = () => {
    const { szamlalo } = useContext(CounterContext);
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <span className="material-symbols-outlined">grass</span>
            </div>
            <div className="navbar-kategoriak">
                <Link to="/">Home</Link>
                <Link to="/zoldsegek">Zöldségek</Link>
                <Link to="/gyumolcsok">Gyümölcsök</Link>
                <div className="navbar-kosar">
                    <Link to="/cart">
                        <span className="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </Link>
                    <span className="navbar-szamlalo">{szamlalo}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
