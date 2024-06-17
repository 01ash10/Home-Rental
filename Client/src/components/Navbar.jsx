import React, { useState } from 'react'
import { IconButton} from "@mui/material"
import { Search, Person, Menu } from "@mui/icons-material"
import {useSelector, useDispatch} from "react-redux"
import  '../styles/variables.scss'
import '../styles/Navbar.scss'  
import {setLogout} from "../redux/state"
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    const [dropdownMenu, setDropdownMenu] = useState(false)
    const user = useSelector((state) => state.user)
    console.log(user);
    const dispatch = useDispatch();

    return (
        <div className='navbar'>
            <a href="/">
                <img src="/src/assets/logo.png" alt="logo" />
            </a>
            <div className='navbar_search'>
                <input type="text"
                 placeholder='search...' 
                //  value={search}
                 />
                <IconButton>
                    <Search  color='#F8395A'/>
                </IconButton>
            </div>

            <div className='navbar_right'>
                {user ? (<a href="/create-listing"> Become a Host</a> 
                ): (<a href="/login">Become a host</a>
            )}

                <button className='navbar_right_account' onClick={() =>  setDropdownMenu(!dropdownMenu)}>
                   
                    <Menu color='#969393' />

                    {!user ? 
                    (<Person style={{color: '#969393'}} />
                 ): (<img
                        src={`http://localhost:3001/${user.profileImagePath.replace(
                          "public",
                          ""
                        )}`}
                        alt="profile photo"
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />

                    )}

                </button>

                { dropdownMenu && !user && (
                 <div className='navbar_right_accountmenu'>
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
                 </div>
                )}
                
                {dropdownMenu && user &&(

                    <div className='navbar_right_accountmenu'>
                        <Link to="">Trip List</Link>
                        <Link to="">WishList</Link>
                        <Link to="">Property List</Link>
                        <Link to="">Reservation List</Link>
                        <Link to="">Become a Host</Link>

                        <Link to="/login" onClick={() => {
                            dispatch(setLogout());
                        }} >LOGOUT</Link>
                        
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;
