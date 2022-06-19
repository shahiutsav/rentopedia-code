import React from "react";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
    const options = {
        value: review.rating,
        size: "large",
        readOnly: true,
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
                    <Rating {...options} />
                </div>
                <div className="desc-review">{review.comment}</div>
            </div>
        </div>
    );
};

export default ReviewCard;
