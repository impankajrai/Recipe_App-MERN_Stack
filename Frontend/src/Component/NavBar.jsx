import React from 'react'
import styles from '../app.module.css'
import request from '../utility/request';
import { useNavigate } from 'react-router-dom';


function NavBar({user,setuser}) {
  const navigate=useNavigate();

  const handelLogout=async()=>{
    const response=await request.get('/auth/logout',true)
    if(response.success){
      setuser("")
      navigate('/login')
    }  
  }

  return (
    <div className={styles.NavBar}>
      <p>Recipe App</p>
      <p>{`Welcome ${user?user:""}`}</p>
     {user && <p className={styles.logout} onClick={handelLogout}>Logout</p>}
    </div>
  )
}

export default NavBar


