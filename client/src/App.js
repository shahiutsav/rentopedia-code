import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Book from "./components/Books/Books";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Book />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
