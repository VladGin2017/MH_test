import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { request } from "../Requests/Requests";
import { loadPosts } from "../features/posts/store/posts";
import PostsList from "../features/posts/components/PostsList";
import AddFrom, { AddFormData } from "../shared/components/AddForm/AddForm";
import Pagination from "../shared/components/Pagination/Pagination";
import { Errors } from "../shared/components/Validation/types/erros";
import formattedErrors from "../shared/utils/getFormattedErrors";
import { Author } from "../features/authors/types/Author";
import InputSelect from "../shared/components/InputSelect/InputSelect";
import DropDown from "../shared/components/DropDown/DropDown";
import { loadAuthors } from "../features/authors/store/Authors";

export interface Authors {
    authors: Author[]
}

export type PickedAuthor = {
    element: {
        id: number,
        name: string
    }, 
    index: number
}

const Posts = () => {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [picture, setPicture] = useState<Blob[]>([])
    const [pageIncrement, setPageIncrement] = useState(1);
    const [errorsRequest, setErrorsRequest] = useState<Errors[]>([])
    const [pickedAuthor, setPickedAuthor] = useState<PickedAuthor>()
    const [isActive, setIsActive] = useState(false);
    const getAuthors = useSelector((state: Authors) => state.authors)

    const dataForm: AddFormData[] = [
        {data: code, name: 'code', typeData: 'text', onChangeData: setCode},
        {data: title, name: 'title', typeData: 'text', onChangeData: setTitle},
        {data: picture, name: 'previewPicture', typeData: 'file', onChangeData: setPicture},
        {data: text, name: 'text', typeData: 'text', onChangeData: setText}
    ]       

    const addPostHandler = async (e: any) => {
        e.preventDefault();
        setErrorsRequest([])      
        const formData = new FormData();
        formData.append('title', title);
        formData.append('code', code);
        formData.append('authorId', pickedAuthor?.element.id.toString() ?? '');
        formData.append('text', text);
        picture.forEach((file) => {
            formData.append(`previewPicture`, file);
        });
    
        await request.post('/manage/posts/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then( async () => {
            await getPosts()
            dataForm.forEach(el => {
                if (el.typeData === 'file') {
                    el.onChangeData([])
                }
                el.onChangeData('')
            })
        })
        .catch((error) => {
            setErrorsRequest((err) => [...err, ...formattedErrors(error.response.data)])
        })
        
    }

    const getPosts = async () => {
        try {
            await request.get('/manage/posts', {
                params: {
                    page: pageIncrement
                }
            }).then((res) => {dispatch(loadPosts(res.data))
                localStorage.setItem('CurrentPage', res.headers['x-pagination-current-page'])
                localStorage.setItem('PageCount', res.headers['x-pagination-page-count'])
                localStorage.setItem('TotalPosts', res.headers['x-pagination-total-count'])
                
            })
            .catch(error => {
                console.log(error); 
            })
        } catch(error) {
            throw new Error ('Error')
        }
    }
       
    useEffect(() => {
        if (isActive && getAuthors.length === 0) {
            try {
                request.get('/manage/authors').then((res) => {dispatch(loadAuthors(res.data))})
                .catch(error => {
                    console.log(error); 
                })
            } catch(error) {
                throw new Error ('Error')
            }
        }
    })

    useEffect(() => {
        getPosts()
        /* eslint-disable-next-line */
    }, [pageIncrement])

    const updatePick = (payload: PickedAuthor) => {
        setPickedAuthor(payload)
    }

    return (
        <>  
            <>
                {
                    <InputSelect isActiveChildren={isActive} onClickFunc={() => setIsActive(!isActive)} title={pickedAuthor?.element.name ?? 'No authors'}>
                        <DropDown isActive={isActive} onClickFunc={updatePick} updateIsActive={setIsActive} defaultValue={pickedAuthor?.element.name ?? ''} optionArr={getAuthors.map((el) => ({name: el.name, id: el.id}))}/>
                    </InputSelect>
                }
            </>
            <AddFrom errors={errorsRequest} data={dataForm} submitHandler={addPostHandler}/>
            <h3>Posts: {localStorage.getItem('TotalPosts') ?? ''}</h3>
            <PostsList />
            <Pagination currentPage={pageIncrement} 
                totalPages={Number(localStorage.getItem('PageCount'))}
                pageChange={setPageIncrement}/>

        </>
    )
}

export default Posts;