import React, { ReactElement, useEffect, useRef, useState } from "react";
import './DropDown.css'
import {ReactComponent as Picked} from "./static/picked.svg";
import { useOutsideClick } from "../../utils/useOutsideClick";

interface OptionArray {
    name: string, 
    id: number
}

interface DropDownProps {
    children?: ReactElement,
    isActive: boolean,
    updateIsActive: Function,
    position?: object,
    optionArr: OptionArray[],
    defaultValue: string | number | null,
    onClickFunc: Function
}

export default function DropDown({children, optionArr, isActive, updateIsActive, position, defaultValue, onClickFunc}: DropDownProps) {
    const refDropDown = useRef<HTMLDivElement | null>(null)
    const [arrayOfList, setArrayOfList] = useState(optionArr);
    useOutsideClick(refDropDown, () => closeDD(), isActive)
    
    const closeDD = () => {
        setArrayOfList(optionArr)
        updateIsActive(false)
    }
    
    useEffect(() => {
        setArrayOfList(optionArr)
    }, [optionArr])

    useEffect(() => {
        if (refDropDown.current) {
            
        }
    })
    
    return (
        <div ref={refDropDown} style={isActive ? position : {}} className={isActive ? "DropDown" : "hiddenDropDown"} >
            <ul className="DropDown__option-list" style={refDropDown.current ? {minWidth: `${refDropDown.current.offsetWidth}px`} : {}}>
                {
                    arrayOfList.length > 0 ?
                    arrayOfList.map((el, index) => {
                        return (
                            <li className="DropDown__option-el"
                                onClick={(e) => {
                                    onClickFunc({element: el, index: index})
                                    closeDD()
                                    e.stopPropagation()
                                }} 
                                key={index}><p className="DropDown__option-el__p">{el.name}</p>
                                <span style={{visibility: defaultValue === index || defaultValue === el.name ? 'visible' : 'hidden'}}>
                                    <Picked/>
                                </span>
                            </li>
                        )
                    }) : <li className="DropDown__option-el__empty"><p>Совпадений не найдено</p></li>
                }
            </ul>
            {children}
        </div>
    )
}