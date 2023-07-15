import './Navbar.css' 
import React, { useEffect } from 'react';
import { Outlet, Link,useNavigate } from 'react-router-dom';
import Avatar from './Avatar/Avatar'
import {useSelector,useDispatch} from 'react-redux'
import Search from '../assets/search.svg'
import logo from '../assets/stack-overflow.webp'
import { setCurrentUser } from '../actions/currentUser'
import decode from 'jwt-decode'

function Navbar()
{   
    const dispatch=useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(()=>{
        const token = User?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])
    return(
        <>
       <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                 <img src={logo} alt="logo" /> 
            </Link>
            <Link to='*' className='nav-item nav-btn'>About</Link>
            <Link to='*' className='nav-item nav-btn'>Products</Link>
            <Link to='*' className='nav-item nav-btn'>For Teams</Link>
            <form>
                <input type='text' placeholder='Search...'/>
                 <img src={Search} alt="search" className='search-icon' /> 
            </form>
            { User==null ?
             <Link to='/Auth' className='nav-item nav-link'>Log in</Link>:
               <>
                    <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%' color='white' ><Link to={`/Users/${User?.result?._id}`} style={{ color:'white',textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='nav-item nav-link' onClick={handleLogout} >Log out</button>
                </>
             }
        </div>
       </nav>
       <Outlet/>
       </>
    )
}
export default Navbar;