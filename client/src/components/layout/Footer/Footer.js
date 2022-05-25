import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Rentopedia</h4>
                        <ul>
                            <li>
                                <a href="#">About us</a>
                            </li>
                            <li>
                                <a href="#">Our Services</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <ul>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                            <li>
                                <a href="#">Shipping</a>
                            </li>
                            <li>
                                <a href="#">Returns</a>
                            </li>
                            <li>
                                <a href="#">Order Status</a>
                            </li>
                            <li>
                                <a href="#">Payment Options</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Cart</h4>
                        <div className="social-links">
                            <a href="#">
                                <i className="fab fa-instagram"></i>
                            </a>

                            <a href="#">
                                <i className="fab fa-facebook"></i>
                            </a>

                            <a href="#">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
