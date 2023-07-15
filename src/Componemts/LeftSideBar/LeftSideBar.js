import React from "react";
import {NavLink} from 'react-router-dom'
import globe from '../../assets/icons8-globe-24.png'
import './LeftSideBar.css'
const LeftSideBar=()=>
{
    return(
        <div className="left-sidebar">
            <nav className="side-nav">
                <NavLink to="/" className='side-nav-links' activeClassName="active">
                    <p>Home</p>
                </NavLink>
                <div className="side-nav-div">
                    <div><p>PUBLIC</p></div>
                    <NavLink to="/Question" className='side-nav-links' activeClassName='active'>
                    <img src={globe} alt="globe"/>
                    <p style={{paddingLeft:'10px'}}>Questions</p>
                    </NavLink>
                    <NavLink to='/tags' className='side-nav-links' activeClassName='active'>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to='/users'  className='side-nav-links' activeClassName='active'>
                        <p>Users</p>
                    </NavLink>
                    <NavLink to='/Socialmedia'  className='side-nav-links' activeClassName='active'>
                        <p>SocialMedia</p>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}
export default LeftSideBar;