import React, { Fragment, useEffect, useState } from "react";
import "./NewBook.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createBook } from "../../actions/bookAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_BOOK_RESET } from "../../constants/bookConstants";
import { useNavigate } from "react-router-dom";

const NewBook = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newBook);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [cover, setCover] = useState();
    const [coverPreview, setCoverPreview] = useState("/BookCover.png");

    const categoriesFiction = [
        "Action and adventure",
        "Alternate History",
        "Anthology",
        "Chick lit",
        "Children's",
        "Classic",
        "Comic book",
        "Coming-of-age",
        "Crime",
        "Drama",
        "Fairytale",
        "Fantasy",
        "Graphic novel",
        "Historical fiction",
        "Horror",
        "Mystery",
        "Paranormal romance",
        "Picture book",
        "Poetry",
        "Political Thriller",
        "Romance",
        "Satire",
        "Science fiction",
        "Short story",
        "Suspense",
        "Thriller",
        "Western",
        "Young adult",
    ];

    const categoriesNonFiction = [
        "Art/Architecture",
        "Autobiography",
        "Biography",
        "Business/economics",
        "Crafts/hobbies",
        "Cookbook",
        "Diary",
        "Dictionary",
        "Encyclopedia",
        "Guide",
        "Health/fitness",
        "History",
        "Home and garden",
        "Humor",
        "Journal",
        "Math",
        "Memoir",
        "Philosophy",
        "Prayer",
        "Religion, spirituality, and new age",
        "Textbook",
        "True crime",
        "Review",
        "Science",
        "Self help",
        "Sports and leisure",
        "Travel",
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Book Created Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: NEW_BOOK_RESET });
        }
    }, [dispatch, alert, error, navigate, success]);

    const createBookSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("title", title);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("genre", genre);
        myForm.set("cover", cover);
        dispatch(createBook(myForm));
    };

    const createBookCoverChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setCoverPreview(reader.result);
                setCover(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <Fragment>
            <MetaData title="Create Book" />
            <div className="dashboard">
                <SideBar />
                <div className="new-book-container">
                    <form
                        className="create-book-form"
                        encType="multipart/form-data"
                        onSubmit={createBookSubmitHandler}
                    >
                        <h1>Create Book</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Book Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setGenre(e.target.value)}>
                                <option
                                    disabled
                                    className="disable-option"
                                    value=""
                                >
                                    Choose Genre
                                </option>
                                <option
                                    disabled
                                    className="disable-option"
                                    value=""
                                >
                                    Fiction
                                </option>
                                {categoriesFiction.map((cateFic) => (
                                    <option key={cateFic} value={cateFic}>
                                        {cateFic}
                                    </option>
                                ))}
                                <option
                                    disabled
                                    className="disable-option"
                                    value=""
                                >
                                    Nonfiction
                                </option>
                                {categoriesNonFiction.map((cateNonFic) => (
                                    <option key={cateNonFic} value={cateNonFic}>
                                        {cateNonFic}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Book Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div id="createBookFormFile">
                            <input
                                type="file"
                                name="cover"
                                accept="image/*"
                                onChange={createBookCoverChange}
                            />
                        </div>

                        <div id="createBookFormCover">
                            <img src={coverPreview} alt="Cover Preview" />
                        </div>

                        <Button
                            id="createBookBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewBook;
