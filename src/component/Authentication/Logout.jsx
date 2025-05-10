import { useEffect } from 'react'

const Logout = () => {
    useEffect(()=>{
       sessionStorage.removeItem('token')
       window.location = '/'
    },[])

  return (null)
}

export default Logout
