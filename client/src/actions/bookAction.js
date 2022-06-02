import axios from "axios";

import {
    ALL_BOOK_REQUEST,
    ALL_BOOK_SUCCESS,
    ALL_BOOK_FAIL,
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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
