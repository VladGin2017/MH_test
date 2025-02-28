import React, { useState } from "react";
import DefaultInput from "../Input/DefaultInput";
import Uploader from "../Uploader/Uploader";
import Validation from "../Validation/Validation";
import { Errors } from "../Validation/types/erros";
import './AddForm.css';

export type AddFormData = {
    data: string | number | Blob[],
    name: string,
    typeData: 'email' | 'text' | 'password' | 'file' | 'checkbox' | 'number',
    onChangeData: Function,
}

interface AddFormProps {
    submitHandler: Function,
    data: AddFormData[],
    errors: Errors[]
    btnName?: 'Редактировать' | 'Добавить'
}

const AddFrom = ({data, submitHandler, errors, btnName='Добавить'} : AddFormProps) => {
    const [restorePicture, setRestorePicture] = useState(false)    
    return (
        <div className="addForm">
            <form onSubmit={(e) => {submitHandler(e)
            setRestorePicture(true)}}>
                <ul className="addForm__list">
                    {
                        data.map((el, index) => {
                            if (el.typeData === 'file') {
                                return (
                                    <li className="addForm__list-item">
                                        <Uploader key={index} picture={el.data as Blob[]} restore={restorePicture} updatePicture={el.onChangeData}/>
                                        <Validation data={errors} keyItem={el.name}/>
                                    </li>
                                )
                            }                            
                            return (
                                <li className="addForm__list-item">
                                    <DefaultInput placeHolder={el.name} 
                                        inputType='text'
                                        key={index} 
                                        onChangeFunc={el.onChangeData} 
                                        inputValue={`${el.data}`}/>
                                    <Validation data={errors} keyItem={el.name}/>
                                </li>
                            )       
                        })
                    }
                </ul>
            
            <button type="submit">{btnName}</button>
            </form>
        </div>
    )
}

export default AddFrom;