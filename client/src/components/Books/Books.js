import React, { Fragment, useEffect, useState } from "react";
import "./Books.css";
import MetaData from "../layout/MetaData";
import { getBook } from "../../actions/bookAction";
import { useSelector, useDispatch } from "react-redux";

import Pagination from "react-js-pagination";

import BookCard from "./BookCard";

import { useParams } from "react-router-dom";

const Book = () => {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const {books, bookCount, resultPerPage } = useSelector(
        (state) => state.books
    );

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    useEffect(() => {
        dispatch(getBook(keyword, currentPage));
    }, [dispatch, keyword, currentPage]);
    return (
        <Fragment>
            <MetaData title="Rentopedia" />
            <div className="small-container">
                <h2 className="title">Featured Books</h2>
                <Fragment>
                    <div className="row">
                        {books &&
                            books.map((book) => (
                                <BookCard book={book} key={book._id} />
                            ))}
                    </div>
                    {resultPerPage < bookCount && (
                        <div className="pagination-box">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={bookCount}
                                onChange={setCurrentPageNo}
                                nextPageText=">"
                                prevPageText="<"
                                firstPageText="<<"
                                lastPageText=">>"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            </div>
        </Fragment>
    );
};

export default Book;
