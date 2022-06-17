import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "rgb(254, 180, 42)",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    };
    return (
        <div className="review">
            <div className="head-review">
                <img
                    className="review-image"
                    src={review.avatar}
                    width="100px"
                />
            </div>
            <div className="body-review">
                <div className="name-review">{review.name}</div>
                <div className="rating">
                    <ReactStars {...options} />
                </div>
                <div className="desc-review">{review.comment}</div>
            </div>
        </div>
    );
};

export default ReviewCard;
