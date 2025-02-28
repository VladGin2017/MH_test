import React, { useEffect, useState } from "react";
import { request } from "../../../Requests/Requests";
import { useParams } from "react-router-dom";
import { DetailPostType } from "../types/detailPost";
import AddFrom, { AddFormData } from "../../../shared/components/AddForm/AddForm";
import { Errors } from "../../../shared/components/Validation/types/erros";
import { Tag } from "../../tags/types/tag";
import formattedErrors from "../../../shared/utils/getFormattedErrors";
import { useSelector } from "react-redux";
import { Authors, PickedAuthor } from "../../../pages/Posts";
import InputSelect from "../../../shared/components/InputSelect/InputSelect";
import DropDown from "../../../shared/components/DropDown/DropDown";

const DetailPost = () => {
    const params = useParams();
    const [detailPost,  setDetailPost] = useState<DetailPostType>()
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [errorsRequest, setErrorsRequest] = useState<Errors[]>([])
    const [pickedAuthor, setPickedAuthor] = useState<PickedAuthor>()
    const [isActive, setIsActive] = useState(false);
    const getAuthors = useSelector((state: Authors) => state.authors)


    const dataForm: AddFormData[] = [
        {data: code, name: 'code', typeData: 'text', onChangeData: setCode},
        {data: title, name: 'title', typeData: 'text', onChangeData: setTitle},
        {data: text, name: 'text', typeData: 'text', onChangeData: setText}
    ]
    
    const getDetailPost = async () => {
        try {
            await request.get('/manage/posts/detail', {
                params: {
                    id: params.id
                }
            }).then((response) => {
                setDetailPost(response.data)               
            })
        } catch (error) {
            
        }
    }    

    const deletePostHandler = async () => {
        await request.delete('/manage/posts/remove', {
            params: {
                id: params.id
            }
        }).then(() => {
            window.location.replace('/posts')
        })
    }

    const onChangePostHandler = async (e: any) => {
        e.preventDefault();
        setErrorsRequest([])      
        const formData = new FormData();
        formData.append('title', title);
        formData.append('code', code);
        formData.append('authorId', pickedAuthor?.element.id.toString() ?? '');
        formData.append('text', text);
        
        await request.post('/manage/posts/edit', formData, {
            params: {
                id: params.id
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            getDetailPost()
        })
        .catch((error) => {
            setErrorsRequest((err) => [...err, ...formattedErrors(error.response.data)])
        })
    }

    useEffect(() => {
        if (detailPost) {
            setCode(detailPost?.code)
            setTitle(detailPost.title)
            setText(detailPost.text)
        }
    }, [detailPost])
 
    useEffect(() => {
        getDetailPost()
        /* eslint-disable-next-line */
    }, [params])

    const toNormalizeDate = (value: string) => {
        const date = new Date(value)
        return (
            date.toDateString()
        )
    }

    const updatePick = (payload: PickedAuthor) => {
        setPickedAuthor(payload)
    }

    return (
        <div style={{display: 'flex', width: '800px', flexDirection: 'column', justifyContent: 'center', marginRight: 'auto', marginLeft: 'auto'}}>
            {
                detailPost !== undefined &&
                <>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <h1>{detailPost.title}</h1>
                        <p>{toNormalizeDate(detailPost.createdAt)}</p>
                    </div>
                    {
                        detailPost.previewPicture.url && 
                            <img style={{width: '250px', height: '250px', marginRight: 'auto', marginLeft: 'auto', objectFit: 'contain'}} 
                                src={`${detailPost.previewPicture.url}`} 
                                alt={`${detailPost.previewPicture.name}`} />
                    }
                    <div>
                        {
                            detailPost.tags.length > 0 &&
                            <>
                                <p>Теги:</p>
                                {detailPost.tags.map((el: Tag) => {
                                    return (
                                        <p style={{color: 'green'}}>{el.name}</p>
                                    )
                                })}
                            </>
                        }
                    </div>
                    <>
                        {
                            <InputSelect isActiveChildren={isActive} onClickFunc={() => setIsActive(!isActive)} title={pickedAuthor?.element.name ?? 'No authors'}>
                                <DropDown isActive={isActive} onClickFunc={updatePick} updateIsActive={setIsActive} defaultValue={pickedAuthor?.element.name ?? ''} optionArr={getAuthors.map((el) => ({name: el.name, id: el.id}))}/>
                            </InputSelect>
                        }
                     </>
                    <AddFrom errors={errorsRequest} data={dataForm} btnName="Редактировать" submitHandler={onChangePostHandler}/>
                    <button onClick={() => {deletePostHandler()}}>Удалить</button>
                </>

            }
        </div>
    )
}

export default DetailPost;