import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1",
    activeColor: "tomato",
    value: 3.5,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
};

const BookCard = ({ book }) => {
    return (
        <Link className="col-4" to={book._id}>
            <img src={book.images[0].url} alt="" />
            <h4>{book.name}</h4>
            <div>
                <ReactStars {...options} />
            </div>
            <p>{book.price} </p>
        </Link>
    );
};

export default BookCard;
