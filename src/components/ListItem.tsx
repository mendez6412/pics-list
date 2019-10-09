import React, { FunctionComponent } from 'react';
import { IPictureItem } from './List';

export const ListItem: FunctionComponent<IPictureItem> = ({ id, url, title, isHidden, isSelected, onItemClick }) => {
    const handleClick = () => {
        onItemClick(id)
    }

    return (
        isHidden ? 
        null :
        <div className={"item " + (isSelected ? 'selected' : '')} onClick={handleClick}>
            <h3>{title}</h3>
            <img src={url} alt=""/>
        </div> 
    )
}