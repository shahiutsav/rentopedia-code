import "./App.css";
import React from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import NavbarAuthenticated from "./components/layout/NavbarAuthenticated/NavbarAuthenticated";
import Footer from "./components/layout/Footer/Footer";
import Book from "./components/Books/Books";
import Search from "./components/Search/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails/BookDetails";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/NavbarAuthenticated/UserOptions";
import { useSelector } from "react-redux";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Profile from "./components/User/Profile.js";
import UpdatePassword from "./components/User/UpdatePassword";
import ProtectedRoute from "./components/Route/ProtectedRoute";

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    React.useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <div>
            <Router>
                {isAuthenticated ? (
                    <div>
                        <NavbarAuthenticated /> <UserOptions user={user} />
                    </div>
                ) : (
                    <Navbar />
                )}
                <Routes>
                    <Route path="/" element={<Book />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/books/:keyword" element={<Book />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<LoginSignUp />} />
                    <Route
                        path="/password/forgot"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/password/reset/:token"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/me"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/password/update"
                        element={
                            <ProtectedRoute>
                                <UpdatePassword />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
