import React from "react";
import { Post } from "../types/post";
import { useSelector } from "react-redux";
import './styles/PostsList.css';
import { useNavigate } from "react-router-dom";

interface posts {
    posts: Post[]
}


const PostsList = () => {
    const navigate = useNavigate()
    const postsArr = useSelector((state: posts) => state.posts);

    return (
        <>  
            <div className="posts">
                {
                    postsArr && 
                    postsArr.map((el : Post, index) => {
                        return (
                            <div className="post-container" key={index} onClick={() => navigate(`/posts/${el.id}`)}>
                                <img src={`${el.previewPicture.url}`} alt={`${el.previewPicture.name}`} className="post-constainer__preview"/>
                                <div className="post-container__info">
                                    <div className="post-container__title">
                                        {el.title}
                                    </div>
                                    <div className="post-container__author">
                                        Автор: {el.authorName}
                                    </div>
                                    <div>
                                        Код: {el.code}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default PostsList;