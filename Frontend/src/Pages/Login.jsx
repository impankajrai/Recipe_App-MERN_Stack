import React from 'react'
import styles from '../app.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import request from '../utility/request';
import { useEffect } from 'react';


function Login({setuser,user}) {
  const navigate=useNavigate();
  const [error,seterror]=useState('')
  
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])


  const handelChange=()=>{
    seterror('');
  }

  const handelSubmit=async(e)=>{
    e.preventDefault()
    const {user_id,password}=e.target;
    const response= await request.post("/auth/login",{user_id:user_id.value,password:password.value},true)
   
    if(response.success){
      setuser(response.user.name)
      navigate('/')
    }else{
       seterror(response.message);
    }
    
  } 
  return (<div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"90vh",width:"100%"}}>
    <form onSubmit={handelSubmit}>  
        <div className={styles.container}>   
            <label>User Id : </label>   
            <input type="text" onChange={handelChange} placeholder="Enter Username" name="user_id" required />  
            <label>Password : </label>   
            <input type="password" onChange={handelChange} placeholder="Enter Password" name="password" required />  
            {error && <p style={{color:"red"}}>{error}</p>}
            <button type="submit">Login</button>   
        </div>   
    </form>     
  
  </div>
  )
}

export default Login