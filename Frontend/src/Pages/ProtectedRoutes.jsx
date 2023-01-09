import { Navigate } from "react-router-dom"

const ProtectedRoutes=({user,Component})=>{
  console.log(user)
 return(<>
 {user?<Component />:<Navigate to='/login' />}

 </>)

}

export default ProtectedRoutes