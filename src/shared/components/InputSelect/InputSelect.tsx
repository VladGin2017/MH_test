import React, { ReactElement } from "react";
import { ReactComponent as OptionArrow } from "./static/icons.svg";
import './InputSelect.css'

interface SelectProps {
    title: string,
    onClickFunc: Function,
    children?: ReactElement,
    isActiveChildren?: boolean,
    disabledStyles?: boolean
}

const InputSelect = ({title = 'Select', onClickFunc, children, isActiveChildren, disabledStyles = false}: SelectProps) => {

    return (
        <>
            <div>
                <span className={`inputSelect ${isActiveChildren ? 'active' : ''} ${disabledStyles && 'disbledStyles'}`} onClick={(e: any) => {
                    e.stopPropagation()
                    onClickFunc()}}>
                    <p className="inputSelect__title">{title}</p>
                    <OptionArrow className={`inputSelect_logo ${isActiveChildren ? 'active' : ''}`}/>
                </span>
                {
                    isActiveChildren && 
                    <div className="inputSelect__optionList">
                        {children}
                    </div>
                }
            </div>
        </>
    )

}

export default InputSelect;