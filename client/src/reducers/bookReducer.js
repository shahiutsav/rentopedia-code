import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
    BOOK_DETAILS_REQUEST,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/bookConstants";

export const bookReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case ALL_BOOK_REQUEST:
            return {
                loading: true,
                books: [],
            };

        case ALL_BOOK_SUCCESS:
            return {
                loading: false,
                books: action.payload.books,
                bookCount: action.payload.bookCount,
                resultPerPage: action.payload.resultPerPage,
            };

        case ALL_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

export const bookDetailsReducer = (state = { book: {} }, action) => {
    switch (action.type) {
        case BOOK_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };

        case BOOK_DETAILS_SUCCESS:
            return {
                loading: false,
                book: action.payload,
            };

        case BOOK_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};
