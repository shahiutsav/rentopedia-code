import axios from "axios";

import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_BOOK_REQUEST,
    ADMIN_BOOK_SUCCESS,
    ADMIN_BOOK_FAIL,
    NEW_BOOK_REQUEST,
    NEW_BOOK_SUCCESS,
    NEW_BOOK_FAIL,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAIL,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
} from "../constants/bookConstants";

export const getBook =
    (keyword = "", currentPage = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_BOOK_REQUEST });

            let link = `/api/v1/books?keyword=${keyword}&page=${currentPage}`;

            const { data } = await axios.get(link);

            dispatch({
                type: ALL_BOOK_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_BOOK_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// Fetch book details from the server
export const getBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOOK_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/books/${id}`);

        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload: data.book,
        });
    } catch (error) {
        dispatch({
            type: BOOK_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get all books (Admin)
export const getAdminBooks = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_BOOK_REQUEST });

        const { data } = await axios.get("/api/v1/admin/books");

        dispatch({
            type: ADMIN_BOOK_SUCCESS,
            payload: data.books,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_BOOK_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create Book
export const createBook = (bookData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BOOK_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/admin/books/new`,
            bookData,
            config
        );

        dispatch({
            type: NEW_BOOK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_BOOK_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Book
export const updateBook = (id, bookData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BOOK_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `/api/v1/admin/books/${id}`,
            bookData,
            config
        );

        dispatch({
            type: UPDATE_BOOK_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BOOK_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Book
export const deleteBook = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BOOK_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/books/${id}`);

        dispatch({
            type: DELETE_BOOK_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_BOOK_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });

        const { data } = await axios.get(`/api/v1/review?id=${id}`);

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, bookId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `/api/v1/review?id=${reviewId}&bookId=${bookId}`
        );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
