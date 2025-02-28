import { Author } from "../types/Author";

const defaultState: Author[] = []

const LOAD_AUTHORS = 'LOAD_AUTHORS';
const REMOVE_AUTHOR = 'REMOVE_AUTHOR';
const ADD_AUTHOR = 'ADD_AUTHOR';
// const EDIT_POST = 'EDIT_POST';

export const authorsReducer = (state = defaultState, action: {type: string, payload: any}) => {
    switch (action.type) {
        case LOAD_AUTHORS:            
            return [...action.payload]
        case ADD_AUTHOR: 
            return {...state, ...action.payload}
        case REMOVE_AUTHOR:
            return state.filter(author => author.id !== action.payload)
        default:
            return state
    }
}

export const loadAuthors = (payload: Author[]) => ({type: LOAD_AUTHORS, payload})
export const addAuthor = (payload: Author) => ({type: ADD_AUTHOR, payload})
export const removeAuthor = (payload: number) => ({type: REMOVE_AUTHOR, payload})