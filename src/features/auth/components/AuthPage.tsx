import React, { useState } from "react";
import DefaultInput from "../../../shared/components/Input/DefaultInput";
import { request, setAccessToken, setRefreshToken } from "../../../Requests/Requests";
import { Errors } from "../../../shared/components/Validation/types/erros";
import Validation from "../../../shared/components/Validation/Validation";

const AuthPage = () => {
    const [email, setEmail] = useState<string>('test@test.ru')
    const [pass, setPass] = useState<string>('khro2ij3n2730')
    const [errorsRequest, setErrorsRequest] = useState<Errors[]>([])

    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorsRequest([])
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', pass);
            await request.post('/auth/token-generate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => {
                setAccessToken(response.data.access_token)
                setRefreshToken(response.data.refresh_token)
                window.location.replace('/user')
            }).catch((error) => {                
                setErrorsRequest((err) => [...err, {key: 'Error', err: error.response.data.message}])
            })
        } catch (error) {
            throw new Error("Error");      
        }
    }

    return (
        <>
            <form style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <DefaultInput inputValue={`${email}`} inputType="email" placeHolder="email" onChangeFunc={setEmail}/>
                <DefaultInput inputValue={`${pass}`} inputType="password" placeHolder="password" onChangeFunc={setPass}/>
                <Validation data={errorsRequest} keyItem="Error"/>
                <button onClick={(e) => handleSubmit(e)}>Вход</button>
            </form>
        </>
    )    
}

export default AuthPage;
