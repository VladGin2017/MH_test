import React, { useEffect, useState } from "react";
import AuthorsList from "../features/authors/components/AuthorsList";
import { request } from "../Requests/Requests";
import { loadAuthors } from "../features/authors/store/Authors";
import { useDispatch } from "react-redux";
import AddFrom, { AddFormData } from "../shared/components/AddForm/AddForm";
import { Errors } from "../shared/components/Validation/types/erros";
import formattedErrors from "../shared/utils/getFormattedErrors";


const Authors = () => {
    const dispatch = useDispatch();

    const [authorName, setAuthorName] = useState('');
    const [authorSecondName, setAuthorSecondName] = useState('');
    const [authorLastName, setAuthorLastName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescrition] = useState('');
    const [avatar, setAvatar] = useState<Blob[]>([]);
    const [errorsRequest, setErrorsRequest] = useState<Errors[]>([]);


    const dataForm: AddFormData[] = [
        {data: authorName, name: 'name', typeData: 'text', onChangeData: setAuthorName},
        {data: authorLastName, name: 'lastName', typeData: 'text', onChangeData: setAuthorLastName},
        {data: authorSecondName, name: 'secondName', typeData: 'text', onChangeData: setAuthorSecondName},
        {data: shortDescription, name: 'shortDescription', typeData: 'text', onChangeData: setShortDescription},
        {data: description, name: 'description', typeData: 'text', onChangeData: setDescrition},
        {data: avatar, name: 'avatar', typeData: 'file', onChangeData: setAvatar}
    ]

    const addAuthorHandler = async (e: any) => {
        e.preventDefault();
        setErrorsRequest([])
        const formData = new FormData();
        formData.append('name', authorName);
        formData.append('lastName', authorLastName);
        formData.append('secondName', authorSecondName);
        formData.append('shortDescription', shortDescription);
        formData.append('description', description);
        avatar.forEach((file) => {
            formData.append(`avatar`, file);
        });
        await request.post('/manage/authors/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then( async () =>{
            await getAuthors()
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

    const getAuthors = async () => {
        try {
            await request.get('/manage/authors').then((res) => {dispatch(loadAuthors(res.data))})
            .catch(error => {
                console.log(error); 
            })
        } catch(error) {
            throw new Error ('Error')
        }
    }

    useEffect(() => {
        getAuthors()
        /* eslint-disable-next-line */
    }, [])

    return (
        <>
            <div>
                <AddFrom data={dataForm} errors={errorsRequest} submitHandler={addAuthorHandler} />
                <AuthorsList />
            </div>
        </>
    )
}

export default Authors;