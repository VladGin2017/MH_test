import React, { ReactElement, useState } from "react";
import './index.css';

export interface inputProps {
    logo?: ReactElement,
    inputType: 'email' | 'text' | 'password' | 'file' | 'checkbox' | 'number'
    placeHolder: string,
    onChangeFunc: Function,
    children?: ReactElement,
    inputValue?: string,
}

export default function DefaultInput({logo, inputType, placeHolder, onChangeFunc, children, inputValue} : inputProps) {
    const [focusDiv, setFocusDiv] = useState<boolean>(false)

    return (
        <>
        <div>
            <div className={focusDiv ? "defaultInput active-input" : "defaultInput"}>
                {
                    logo &&
                    <div className="defaultInput__logo">{logo}</div>
                }
                <input className="defaultInput__input" 
                    type={`${inputType}`}
                    value={`${inputValue}`} 
                    placeholder={`${placeHolder}`} 
                    onClick={() => setFocusDiv(true)} 
                    onBlur={() => setFocusDiv(false)}
                    onFocus={() => setFocusDiv(true)} 
                    onChange={(e) => onChangeFunc(e.target.value)}/>
            </div>
            {children}
        </div>
        </>
    )
}
