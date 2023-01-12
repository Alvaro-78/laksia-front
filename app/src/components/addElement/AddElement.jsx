// Import components from React
import React, { useState, useEffect } from 'react';
// Temporaly desactivated
import { Link } from 'react-router-dom';

// Import the AddIcon Component
import { AddIcon } from '../../assets/icons/AddIcon';

// Import the CSS
import classes from './AddElement.module.css';

// AddElement is a component where the User can add Assets, Spaces, etc
export const AddElement = ({ title, text, width, height, iconS, fill, textColor }) => {
    return (
        <div className={classes['wraper']}>
            <div className={classes['elements']}>
                <div>
                    <div 
                        className={classes['create-element']}
                        style={{
                            width: width === undefined ? (width = "15vw") : (width),
                            height: height === undefined ? (height = "15vw") : (height),
                            flexDirection: text !== undefined && "column" }}>
                        {/* Check the variables introduced by the Developer */}
                        <AddIcon height={iconS === undefined ? (iconS = "100px") : (iconS)} width={iconS === undefined ? (iconS = "100px") : (iconS)} fill={fill === undefined ? (fill = "#8B8B8B") : (fill)} />
                        <p style={{
                            color: textColor === undefined ? (textColor = "#414141") : (textColor = "black")
                        }}>{text}</p>
                    </div>
                    {/* If the user has entered a title then this will be showed, if not, it will be omited */}
                    {title === undefined ? (title = "") : (<div className={classes['element-title']}>{title}</div>)}
                </div>
            </div>
        </div>
    )
}