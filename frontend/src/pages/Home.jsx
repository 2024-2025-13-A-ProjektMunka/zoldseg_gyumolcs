import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-kategoriak">
                <div className="home-kategoria">
                    <Link to="/zoldsegek">Zöldségek</Link>
                </div>
                <div className="home-kategoria">
                    <Link to="/gyumolcsok">Gyümölcsök</Link>
                </div>
                <div className="home-kategoria">
                    <Link to="/cart">Kosár</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
