import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";

function App() {
    return (
        <Router>
            <Navbar />
            <Footer />
        </Router>
    );
}

export default App;
