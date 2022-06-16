import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { bookDetailsReducer, bookReducer } from "./reducers/bookReducer";
import {
    userReducer,
    forgotPasswordReducer,
    profileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
    books: bookReducer,
    bookDetails: bookDetailsReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    profile: profileReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
