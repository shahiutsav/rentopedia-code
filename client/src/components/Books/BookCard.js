import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./BookCard.css";

const BookCard = ({ book }) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1",
        activeColor: "#ffc107",
        value: book.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    };
    return (
        <div className="col-4">
            <img src={book.cover[0].url} alt={`Image for ${book.title}`} />

            <div className="book-details-side">
                <h4>{book.title}</h4>
                <p> {book.description} </p>
                <div className="review-section">
                    <ReactStars {...options} />
                </div>
            </div>
            <Link className="button-detail" to={`/book/${book._id}`}>
                Details
            </Link>
        </div>
    );
};

export default BookCard;
