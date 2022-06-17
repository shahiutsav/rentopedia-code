const express = require("express");
const {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    getBookDetails,
    createBookReview,
    getBookReviews,
    deleteReview,
} = require("../controllers/bookController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/books").get(getAllBooks);

router
    .route("/books/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createBook);

router
    .route("/books/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateBook)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBook)
    .get(getBookDetails);

router
    .route("/review")
    .put(isAuthenticatedUser, createBookReview)
    .get(getBookReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
