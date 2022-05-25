import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
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
