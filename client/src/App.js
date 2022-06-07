import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Book from "./components/Books/Books";
import Search from "./components/Search/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails/BookDetails";
import LoginSignUp from "./components/User/LoginSignUp";

function App() {
    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<Book />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/books/:keyword" element={<Book />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<LoginSignUp />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
