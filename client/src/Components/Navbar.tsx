import React from 'react';
import './Navbar.scss';
import { GiPlagueDoctorProfile } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className='navbar'>
            <h5>Movie Pinger</h5>
            <Link to='/watchers/self'>
                <GiPlagueDoctorProfile/>
            </Link>
        </div>
    );
}