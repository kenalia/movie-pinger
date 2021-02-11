import React from 'react';
import './Footer.scss';

export const Footer = () => {

    return (
        <div className='footer'>
            <p>&copy;Kenalia, {new Date().getFullYear()}</p>
        </div>
    )
}