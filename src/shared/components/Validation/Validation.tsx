import React from "react";
import './Validation.css';

interface ValidationProps {
    data: string[] | object[],
    keyItem: string,
}

export default function Validation({data, keyItem} : ValidationProps) {    
    function checkKey(error: any, index: number) {
        if (error.key === keyItem) {            
            return <p key={index} className="validation-alert">* {error.err}</p>
        } else {
            return
        }
    }

    return (
        <>
            {
                data.length === 0 ? null :
                    data.map((item, index) => {                
                        return checkKey(item, index) 
                })
            }
        </>
    )
}