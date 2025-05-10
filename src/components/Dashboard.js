import React from 'react'
import '../components/style.css'
import SideNav from './SideNav'

const Dashboard = () => {
  return (
    <div className='dashboard-main-container'>
      <div className='dashboard-container'>
        <SideNav />
        <div className='main-container'>
          <div className='top-bar'>
            <div className='logo-container'>
              <img alt='profile logo' className='profile-logo' src={require('../assets/logo.png')} />
            </div>
            <div className='profile-container'>
              <h2 className='profile-name'>SS Acaemy</h2>
              <button className='logout-btn'>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
