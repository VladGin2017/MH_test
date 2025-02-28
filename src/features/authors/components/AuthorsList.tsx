import { useDispatch, useSelector } from "react-redux"
import { Author } from "../types/Author"
import React from "react"
import { request } from "../../../Requests/Requests"
import { removeAuthor } from "../store/Authors"
import './styles/AuthorsList.css';


interface Authors {
    authors: Author[]
}

const AuthorsList = () => {
    const dispatch = useDispatch();
    const getAuthors = useSelector((state: Authors) => state.authors)
   
    const deleteAuthor = (id: number) => {
        request.delete('/manage/authors/remove', {
            params: {
                id: id
            }
        }).then(() => dispatch(removeAuthor(id)))
    }

    return (
        <div>
            <div className="Authors-container">
                {
                    getAuthors && 
                    getAuthors.map((el, index) => {
                        return(
                            <div className="Author" key={index} onClick={(e) => {
                                e.stopPropagation()
                                deleteAuthor(el.id)}}>
                                {
                                    el.avatar ?
                                    <img className="Author__img" src={`${el.avatar.url}`} alt={`${el.avatar.name}`} /> :
                                    <div style={{width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e1e4ed'}}/>
                                }
                                <div>
                                    <p>Name: {el.name}</p>
                                    <p>Second Name: {el.secondName}</p>
                                    <p>Last Name: {el.lastName}</p>
                                </div>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AuthorsList;