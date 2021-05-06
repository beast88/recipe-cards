import React, { useState } from 'react'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

function Landing() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="customwidth bg-white border rounded shadow-lg">
        <div className="px-2 py-5 w-100">
          {isLogin ? <Login renderRegister={() => {setIsLogin(false)}} /> : <Register renderLogin={() => {setIsLogin(true)}} />}
        </div>
      </div>
    </div>
  );
}

export default Landing;
