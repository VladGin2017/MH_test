import React, { useEffect, useRef, useState } from "react";
import IconThumbNail from "./IconThumbNail/IconThumbNail";
import Validation from "../Validation/Validation";
import { Errors } from "../Validation/types/erros";


interface UploaderProps {
    updatePicture: Function,
    picture: Blob[],
    restore: boolean
}

const Uploader = ({updatePicture, restore, picture}: UploaderProps) => {
    const uploadRef = useRef<HTMLInputElement | null>(null);
    // const [picture, setPicture] = useState<Blob[]>([]);
    const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    const [dataErrors, setDataErrors] = useState<Errors[]>([]);

    const openFiles = () => {
        if (uploadRef) {
            uploadRef.current?.click()
            
        }
    }

    const checkImage = (value: File) => {
        return new Promise<any>(async function (resolve, reject) {
          if ((value.size  * Math.pow(10, -6)) > 5) {
            reject('файл слишком большой, ограничение до 5мб')
          } else if (!allowedFormats.includes(value.type)) {
            reject('можно загрузить только форматы jpeg, jpg, png')
          } else {
            resolve(value)
          }
        })
      }

    const handleChangeUploader = (e: any) => {
        const file = e.target.files[0]    
        if (file) {
            checkImage(file).then(() => {
                // setPicture([file])
                updatePicture([file])        
                setDataErrors(prevstate => [...prevstate.filter((el: Errors) => el.key !== 'uploadFiles')])
            })
            .catch(err => {
                setDataErrors(prevstate => [...prevstate, {key: 'uploadFiles', err: `${err}`}])
            })
          }
          if (!file) return;
    }

    useEffect(() => {
        if (restore) {
            // setPicture([])
        }
    }, [restore])

    return (
        <div style={{display: 'flex'}}>
            <div onClick={() => openFiles()} style={{height: '25px', color: '#FFF', backgroundColor: '#232360', flex: 'auto'}}>
                <p style={{margin: 0}}>Загрузить файл</p>
                <Validation data={dataErrors} keyItem="uploadFiles"/>
            </div>
                {
                    picture.length > 0 && 
                    <IconThumbNail iconsArray={picture}  removeIcon={() => updatePicture([])}/>
                }
            <input ref={uploadRef} onChange={(e) => handleChangeUploader(e)} type="file" accept="image/png, image/jpeg" style={{display: "none"}}/>
        </div>
    )
}

export default Uploader;