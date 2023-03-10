import React, { useRef, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css';

import { motion } from 'framer-motion';

import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import useAuth from '../../custom-hooks/useAuth';

import { Container, Row } from 'reactstrap';
import { useSelector } from "react-redux";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

import {db} from '../../firebase.config';
import useGetData from '../../custom-hooks/useGetData';

const nav__links = [
  {
    path:'home',
    display: 'Home'
  },
  {
    path:'shop',
    display: <div> Search <i class="ri-search-line"></i> </div>
  },
  {
    path:'cart',
    display: 'Cart'
  },
];



const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector(state=> state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  const [showProfileActions, setShowProfileActions] = useState(false);
  const [data, setData] = useState({});




  const menuRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth()

  const handleScroll = () => {
    if (headerRef.current) {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    }
  };

  const logout = ()=>{

    signOut(auth).then(()=>{
      toast.success('Logged out successfully')
      navigate("/home")
    }).catch(err=>{
      toast.error(err.message)
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  const menuToggle = ()=> menuRef.current.classList.toggle('active__menu');

  const navigateToCart =()=>{
    navigate('/cart');
  };

  const toggleProfileActions = () => {
    setShowProfileActions(!showProfileActions);
  };


  const { data: appearancesData, loading} = useGetData ('appearance');



  return (
  <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              {
                (appearancesData.map(item=>(
                  <tr key={item.id}>
                
                <td>
                  <img src={item.siteLogoUrl} alt="" />
                </td>
                
                
              </tr>
                ))
              )
              }
              <div>
                <h1>{
                   (appearancesData.map(item=>(
                    <tr key={item.id}>
                  
                  <td>{item.productName}</td>
                  
                  
                </tr>
                  ))
                )}</h1>
                
              </div>
            </div>

            

             <div className="navigation" ref={menuRef} onClick={menuToggle}>
               <ul className="menu">
                
                {
                  nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                  <NavLink to={item.path}
                   className={(navClass)=> 
                   navClass.isActive ? 'nav__active' : ''
                   } 
                   >
                    {item.display}
                  </NavLink>
                </li>
                  ))
                }

               </ul>

              

             </div>
            
             <div className="nav__icons">
              <span className="fav__icon">
                <i class="ri-heart-line"></i>
                <span className="badge">1</span>
                </span>
               <span className="cart__icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
                </span>

                <div className="profile">
    <motion.img
      whileTap={{ scale: 1.2 }}
      src={currentUser ? currentUser.photoURL : userIcon}
      alt=""
      onClick={toggleProfileActions}
    />
    <div
      className="profile__actions"
      ref={profileActionRef}
      style={{ display: showProfileActions ? "block" : "none" }}
    >
      {currentUser ? (
        <span onClick={() => logout()}>Logout</span>
      ) : (
        <div className="d-flex align-items-center justify-content-center flex-column">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      )}
    </div>
  </div>

                
                <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i class="ri-menu-line"></i>
                </span>
             </div>
             </div>


          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header;