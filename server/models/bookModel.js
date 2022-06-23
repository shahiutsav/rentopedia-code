const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the name of the Book"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter a suitable description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the price for the book"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    cover: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],

    genre: {
        type: String,
        required: [true, "Please select the book's genre"],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            avatar: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Book", bookSchema);
