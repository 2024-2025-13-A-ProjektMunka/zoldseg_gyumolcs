import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Zoldsegek from './pages/Zoldsegek';
import Gyumolcsok from './pages/Gyumolcsok';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    index
                    element={<Home />}
                />
                <Route
                    path="/zoldsegek"
                    element={<Zoldsegek />}
                />
                <Route
                    path="/gyumolcsok"
                    element={<Gyumolcsok />}
                />
                <Route
                    path="/cart"
                    element={<Cart />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
