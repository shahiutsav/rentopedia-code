const Book = require("../models/bookModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create Book -- Admin
exports.createBook = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.cover, {
        folder: "covers",
    });

    const { title, description, price, genre } = req.body;

    const book = await Book.create({
        title,
        description,
        price,
        genre,
        user: req.user.id,
        cover: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    res.status(201).json({
        success: true,
        book,
    });
});

// Get All Books
exports.getAllBooks = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 9;
    const bookCount = await Book.countDocuments();
    const apiFeature = new ApiFeatures(Book.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const books = await apiFeature.query;
    res.status(200).json({
        success: true,
        books,
        bookCount,
        resultPerPage,
    });
});

// Get Book Details
exports.getBookDetails = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    res.status(200).json({
        success: true,
        book,
    });
});

// Update Book -- Admin
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
    let book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    // Cover Start Here
    let cover = [];

    if (typeof req.body.cover === "string") {
        cover.push(req.body.cover);
    } else {
        cover = req.body.cover;
    }

    if (cover !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < book.cover.length; i++) {
            await cloudinary.v2.uploader.destroy(book.cover[i].public_id);
        }

        const coverLinks = [];

        for (let i = 0; i < cover.length; i++) {
            const result = await cloudinary.v2.uploader.upload(cover[i], {
                folder: "covers",
            });

            coverLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.cover = coverLinks;
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        book,
    });
});

// Delete Book -- Admin
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }
    await book.remove();

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
    });
});

// Create and update review
exports.createBookReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, bookId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar.url,
        rating: Number(rating),
        comment,
    };

    const book = await Book.findById(bookId);

    const isReviewed = book.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        book.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        book.reviews.push(review);
        book.numOfReviews = book.reviews.length;
    }

    let avg = 0;
    book.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    book.ratings = avg / book.reviews.length;

    await book.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get all reviews of a book
exports.getBookReviews = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.query.id);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: book.reviews,
    });
});

// Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.query.bookId);

    if (!book) {
        return next(new ErrorHandler("Book not found", 404));
    }

    const reviews = book.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Book.findByIdAndUpdate(
        req.query.bookId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

// Get All Books (Admin)
exports.getAdminBooks = catchAsyncErrors(async (req, res) => {
    const books = await Book.find();

    res.status(200).json({
        success: true,
        books,
    });
});
