import React from "react";
import './index.css';
import { ReactComponent as RemovePicture } from "./static/trash.svg"

export interface thumbNailProps {
    iconsArray: Blob[],
    removeIcon: Function
}

export default function IconThumbNail({iconsArray, removeIcon}: thumbNailProps) {
    return (
        <div style={{display: 'flex', gap: '15px'}}>
            {
                iconsArray && 
                iconsArray.map((iconItem: any, index) => {
                    return (
                        <div key={index} className='pictureThumbnail__container'>
                          <span className='pictureThumbnail__remove' title='Удалить' onClick={(e) => {removeIcon(iconItem)
                            e.stopPropagation()}}><RemovePicture/>удалить</span>
                          <img className='pictureThumbnail' title={`${iconItem.name}`} src={`${URL.createObjectURL(iconItem)}`} alt="pictureThumbnail" />
                        </div>
                    )
                })
            }
        </div>
    )
}