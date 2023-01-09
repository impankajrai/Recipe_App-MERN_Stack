import React,{useState,useEffect} from 'react'
import NavBar from './Component/NavBar'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import RecipeDetails from './Pages/RecipeDetails'
import { Route, Routes} from 'react-router-dom'
import request from './utility/request'


const App = () => {
const [user,setUser]=useState("")


const getData=async()=>{
    const response=await request.get('/auth/isauthanticated',true)
    if(response.success){
     setUser(response.user.name)
    }
  }

useEffect(()=>{
    getData()
},[])

    return (
     <>
     <NavBar user={user} setuser={setUser}/>
    <Routes>
        <Route path="/login" element={<Login user={user} setuser={setUser}/>} />
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/recipe/:id" element={<RecipeDetails user={user} />} />
    </Routes>
    
     </>
    )
}




export default App