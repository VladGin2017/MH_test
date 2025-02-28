import { User } from "../types/user";


const defaultState: User[] = []

const LOAD_USER_DATA = 'LOAD_USER_DATA';

export const userReducer = (state = defaultState, action: {type: string, payload: User[]}) =>  {
    switch (action.type) {
        case LOAD_USER_DATA:
            return {...state, defaultState: action.payload}
        default:
            return state
    }
}

export const loadUser = (payload: User[]) => ({type: LOAD_USER_DATA, payload})