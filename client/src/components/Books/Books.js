import React, { Fragment, useEffect } from "react";
import "./Books.css";
import MetaData from "../layout/MetaData";
import { getBook } from "../../actions/bookAction";
import { useSelector, useDispatch } from "react-redux";

import BookCard from "./BookCard";

const Book = () => {
    const dispatch = useDispatch();
    const { loading, error, books, bookCount } = useSelector(
        (state) => state.books
    );

    useEffect(() => {
        dispatch(getBook());
    }, [dispatch]);
    return (
        <Fragment>
            <MetaData title="Rentopedia" />
            <div className="small-container">
                <h2 className="title">Featured Books</h2>
                <div className="row">
                    {books && books.map((book) => <BookCard book={book} />)}
                </div>
            </div>
        </Fragment>
    );
};

export default Book;
