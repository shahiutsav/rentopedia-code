import React, { Fragment, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/books/${keyword}`);
        } else {
            navigate("/");
        }
    };

    return (
        <Fragment>
            <MetaData title={"BookChimp - Search"} />
            <form className="search-box" onSubmit={searchSubmitHandler}>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input className="search-btn" type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
