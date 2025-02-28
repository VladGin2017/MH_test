import { createStore, combineReducers, applyMiddleware } from "redux";
import  thunk  from "redux-thunk";
import { postsReducer } from "../features/posts/store/posts";
import { userReducer } from "../features/profile/store/user";
import { authorsReducer } from "../features/authors/store/Authors";



const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    authors: authorsReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))