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
import UpdateProfile from "./components/User/UpdateProfile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import BookList from "./components/Admin/BookList";
import NewBook from "./components/Admin/NewBook";
import UpdateBook from "./components/Admin/UpdateBook";
import OrderList from "./components/Admin/OrderList";

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const [stripeApiKey, setStripeApiKey] = React.useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
    }

    React.useEffect(() => {
        store.dispatch(loadUser());

        getStripeApiKey();
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
                    <Route
                        path="/me/update"
                        element={
                            <ProtectedRoute>
                                <UpdateProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/cart" element={<Cart />} />

                    <Route
                        path="/shipping"
                        element={
                            <ProtectedRoute>
                                <Shipping />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/order/confirm"
                        element={
                            <ProtectedRoute>
                                <ConfirmOrder />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/process/payment"
                        element={
                            stripeApiKey && (
                                <Elements stripe={loadStripe(stripeApiKey)}>
                                    <ProtectedRoute>
                                        <Payment />
                                    </ProtectedRoute>
                                </Elements>
                            )
                        }
                    />

                    <Route
                        path="/success"
                        element={
                            <ProtectedRoute>
                                <OrderSuccess />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <MyOrders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/order/:id"
                        element={
                            <ProtectedRoute>
                                <OrderDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute isAdmin={true}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/books"
                        element={
                            <ProtectedRoute isAdmin={true}>
                                <BookList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/book"
                        element={
                            <ProtectedRoute isAdmin={true}>
                                <NewBook />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/book/:id"
                        element={
                            <ProtectedRoute isAdmin={true}>
                                <UpdateBook />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoute isAdmin={true}>
                                <OrderList />
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
