import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Cart = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    return (
        <Fragment>
            <MetaData title="My Cart" />
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <RemoveShoppingCartIcon />

                    <Typography>You have no books in your cart</Typography>
                    <Link to="/">View Books</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cart-page">
                        <div className="cart-header">
                            <p>Book</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="cart-container" key={item.book}>
                                    <CartItemCard
                                        item={item}
                                        deleteCartItems={deleteCartItems}
                                    />
                                    <div className="cart-input">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.book,
                                                    item.quantity
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <p>{item.quantity}</p>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.book,
                                                    item.quantity,
                                                    item.stock
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cart-subtotal">{`$${
                                        item.price * item.quantity
                                    }`}</p>
                                </div>
                            ))}

                        <div className="cart-gross-total">
                            <div></div>
                            <div className="cart-gross-total-box">
                                <p>Gross Total</p>
                                <p>{`$${cartItems.reduce(
                                    (acc, item) =>
                                        acc + item.quantity * item.price,
                                    0
                                )}`}</p>
                            </div>
                            <div></div>
                            <div className="check-out-button">
                                <button onClick={checkoutHandler}>
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Cart;
