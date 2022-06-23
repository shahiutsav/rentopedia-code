import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <div className="cart-item-card">
            <img className="book-cover" src={item.cover} alt="ssa" />
            <div>
                <Link to={`/book/${item.book}`}>{item.title}</Link>
                <span>{`Price: $${item.price}`}</span>

                <p onClick={() => deleteCartItems(item.book)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;
