import React from 'react'
import '../components/style.css'
import { Link } from 'react-router-dom';

const SideNav = () => {
    return (
        <div className='nav-container'>
            <div className='brand-container'>
                <img className='profile-logo' alt='brand-logo' src={require('../assets/brandlogo.png')} />
                <div>
                    <h2 className='brand-name'>HariOm Classes</h2>
                    <p className='brand-slogan'>Manage Your App in easy way...</p>
                </div>
            </div>
            <div className='menu-container'>
                <Link className='menu-link'><i className="fa-solid fa-hoouse"></i>Home</Link>
                <Link className='menu-link'><i className="fa-solid fa-book-open"></i>All Course</Link>
                <Link className='menu-link'><i className="fa-solid fa-plus"></i>Add Course</Link>
                <Link className='menu-link'><i className="fa-solid fa-users"></i>All Students</Link>
                <Link className='menu-link'><i className="fa-solid fa-user-plus"></i>Add Students</Link>
                <Link className='menu-link'><i className="fa-solid fa-money-bill-wave"></i>Collect Fee</Link>
                <Link className='menu-link'><i className="fa-solid fa-receipt"></i>Payyment History</Link>
            </div>
        </div>

    )
}

export default SideNav
