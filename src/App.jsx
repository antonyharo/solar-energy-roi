import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Simulator from "./pages/Simulator/Simulator";
import About from "./pages/About/About";
import Articles from "./pages/Articles/Articles";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Simulator />} />
                <Route path="/about" element={<About />} />
                <Route path="/articles" element={<Articles />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
