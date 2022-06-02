import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const BookCard = ({ book }) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1",
        activeColor: "tomato",
        value: 3.5,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    };
    return (
        <Link className="col-4" to={`/book/${book._id}`}>
            <img src={book.cover[0].url} alt="" />
            <h4>{book.title}</h4>
            <div className="review-section">
                <ReactStars {...options} />
                <span>({book.numOfReviews} Reviews)</span>
            </div>
            <p>{`$ ${book.price}`} </p>
        </Link>
    );
};

export default BookCard;
