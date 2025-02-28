import { Post } from "../types/post";

const defaultState: Post[] = []

const LOAD_POSTS = 'LOAD_POSTS';
const REMOVE_POST = 'REMOVE_POST';
const ADD_POST = 'ADD_POST';
// const EDIT_POST = 'EDIT_POST';

export const postsReducer = (state = defaultState, action: {type: string, payload: any}) => {
    switch (action.type) {
        case LOAD_POSTS:
            return [...action.payload]
        case ADD_POST: 
            return [...state, action.payload]
        case REMOVE_POST: 
            return state.filter(post => post.id !== action.payload)
        default:
            return state
    }
}

export const loadPosts = (payload: Post[]) => ({type: LOAD_POSTS, payload})
export const addPost = (payload: Post) => ({type: ADD_POST, payload})
export const removePost = (payload: number) => ({type: REMOVE_POST, payload})