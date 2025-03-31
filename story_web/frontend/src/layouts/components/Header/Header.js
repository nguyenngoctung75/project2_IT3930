import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from "~/config";
import './Header.module.scss';

function Header() {
    return ( 
        <header className='header'>
            {/* Thanh navbar */}
            <nav className='header__navbar'>
                <div className='grid wide'>
                    <Link to={config.routes.home} class="navbar-brand">
                        <img src="assets/images/header-logo.png" alt="Logo Web Truyen" srcset="" class="img-fluid" style={{width:200}}/>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;