import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

// Additional components
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

// Import for book actions
import {
    clearErrors,
    getBookDetails,
    newReview,
} from "../../actions/bookAction";
import MetaData from "../layout/MetaData.js";
import { addItemsToCart } from "../../actions/cartAction";

// Style import
import "./BookDetails.css";

const BookDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();

    const { book, loading, error } = useSelector((state) => state.bookDetails);

    const increaseQuantity = () => {
        if (6 <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("bookId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getBookDetails(id));
    }, [dispatch, id]);

    // Options for rating
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "#ffc107",
        value: book.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    };

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");

    return (
        <Fragment>
            <MetaData title={book.name} />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {/* Book Details section */}
                    <div className="small-container book-details">
                        <div className="row-book-detail">
                            {/* Image Section */}
                            <div className="col-2">
                                {book.cover &&
                                    book.cover.map((item, i) => (
                                        <img
                                            className="book-cover"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </div>

                            {/* Details about the book */}
                            <div className="col-2">
                                <h1>{book.title}</h1>
                                <h4>{`$ ${book.price}`} </h4>

                                {/* Review of the Book */}
                                <div className="review-section-details">
                                    <ReactStars {...options} />
                                    <span>({book.numOfReviews} Reviews)</span>
                                    <button
                                        className="btn-submit-review"
                                        onClick={submitReviewToggle}
                                    >
                                        Submit Review
                                    </button>
                                </div>

                                <Dialog
                                    aria-labelledby="simple-dialog-title"
                                    open={open}
                                    onClose={submitReviewToggle}
                                >
                                    <DialogTitle>Submit Review</DialogTitle>
                                    <DialogContent className="submit-dialog">
                                        <Rating
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                            value={rating}
                                            size="large"
                                        />

                                        <textarea
                                            className="submit-dialog-text-area"
                                            cols="30"
                                            rows="5"
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        ></textarea>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={submitReviewToggle}
                                            color="secondary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={reviewSubmitHandler}
                                            color="primary"
                                        >
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                {/* Add to cart section */}
                                <div className="cart-section">
                                    <div className="cart-actions">
                                        <button onClick={decreaseQuantity}>
                                            -
                                        </button>
                                        <p className="cart-quantity">
                                            {quantity}
                                        </p>
                                        <button onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={addToCartHandler}
                                        className="btn-add-to-cart"
                                    >
                                        Add To Cart
                                    </button>
                                </div>

                                {/* Book Description */}
                                <h3>Description</h3>
                                <p>{book.description}</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="reviewsHeading">Reviews</h1>
                    {book.reviews && book.reviews[0] ? (
                        <div className="reviews">
                            {book.reviews &&
                                book.reviews.map((review) => (
                                    <ReviewCard
                                        review={review}
                                        key={review.user}
                                    />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default BookDetails;
