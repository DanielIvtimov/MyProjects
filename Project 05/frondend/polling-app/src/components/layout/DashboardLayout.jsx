import React, { useContext } from 'react'
import Navbar from './Navbar'
import SideMenu  from "./SideMenu";
import "./styles/DashboardLayout.css"
import UserDetailsCard from '../cards/UserDetailsCard';
import { UserContext } from '../../context/UserContext';

const DashboardLayout = ({children, activeMenu}) => {

  const { user } = useContext(UserContext);

  return (
    <div>
        <Navbar activeMenu={activeMenu} />
        {user && (
          <div className='dashboard-container'>
          <div className='hide-on-small'>
            <SideMenu activeMenu={activeMenu}/>
          </div>
          <div className='dashboard-content'>
            {children}
          </div>
          <div className='user-details-container'>
            <UserDetailsCard profileImageUrl={user && user.profileImageUrl} fullname={user && user.fullName} username={user && user.username} totalPollsVotes={user && user.totalPollsVotes} totalPollsCreated={user && user.totalPollsCreated} totalPollsBookmarked={user && user.totalPollsBookmarked}/>
          </div>
        </div>
        )}
    </div>
  )
}

export default DashboardLayout