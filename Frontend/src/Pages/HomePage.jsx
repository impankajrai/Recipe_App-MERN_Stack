import React,{ useEffect,useState } from 'react'
import Recipe from '../Component/Recipe'
import request  from '../utility/request';
import { useNavigate } from 'react-router-dom';

function HomePage({user}) {
  const navigate=useNavigate();
const [dishes,setDishes]=useState([])

  const getData=async()=>{
    const response=await request.get('/recipes',true)
    if(response.success){
      setDishes(response.recipes)
    }
  }

  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
    
    getData();
    
  },[])


  return (
    <div style={{display:'flex', gap:5}}>
     {
      dishes.map((data,index)=> <Recipe key={index} data={data}/>)
     } 
          
      </div>
  )
}

export default HomePage