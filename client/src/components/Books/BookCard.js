import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./BookCard.css";

const BookCard = ({ book }) => {
    const options = {
        value: book.ratings,
        size: "medium",
        readOnly: true,
        precision: 0.5,
    };
    return (
        <div className="col-4">
            <img src={book.cover[0].url} alt={`Image for ${book.title}`} />

            <div className="book-details-side">
                <h4>{book.title}</h4>
                <p> {book.description} </p>
                <div className="review-section">
                    <Rating {...options} />
                </div>
            </div>
            <Link className="button-detail" to={`/book/${book._id}`}>
                Details
            </Link>
        </div>
    );
};

export default BookCard;
