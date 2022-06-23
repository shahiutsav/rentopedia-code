import React, { Component } from "react";
import { MenuItemsAuthenticated } from "./MenuItems";
import logo from "../../images/logo.png";
import "../Navbar/Navbar.css";

class NavbarAuthenticated extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };
    render() {
        return (
            <nav className="navbar-items">
                <a href="/">
                    <img className="logo-picture" src={logo} alt="logo here" />
                </a>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i
                        className={
                            this.state.clicked ? "fas fa-times" : "fas fa-bars"
                        }
                    ></i>
                </div>
                <ul
                    className={
                        this.state.clicked ? "nav-menu active" : "nav-menu"
                    }
                >
                    {MenuItemsAuthenticated.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

export default NavbarAuthenticated;
