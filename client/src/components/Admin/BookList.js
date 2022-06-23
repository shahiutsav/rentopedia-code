import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./BookList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminBooks,
    deleteBook,
} from "../../actions/bookAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_BOOK_RESET } from "../../constants/bookConstants";

const BookList = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const alert = useAlert();

    const { error, books } = useSelector((state) => state.books);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.book
    );

    const deleteBookHandler = (id) => {
        dispatch(deleteBook(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Book Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_BOOK_RESET });
        }

        dispatch(getAdminBooks());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        {
            field: "id",
            headerName: "Book ID",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "title",
            headerName: "Title",
            minWidth: 350,
            flex: 0.75,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link
                            to={`/admin/book/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteBookHandler(
                                    params.getValue(params.id, "id")
                                )
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    books &&
        books.forEach((item) => {
            rows.push({
                id: item._id,
                price: item.price,
                title: item.title,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL BOOKS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="book-list-container">
                    <h1 id="bookListHeading">ALL BOOKS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="book-list-table"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default BookList;
