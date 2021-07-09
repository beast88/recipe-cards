import React, { useState } from 'react'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ForgotPassword from '../components/auth/ForgotPassword'

function Landing() {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const renderForm = () => {
    if(isLogin && !isForgotPassword) {
      return <Login 
        renderRegister={() => {setIsLogin(false)}}
        renderForgotPassword={() => {setIsForgotPassword(true)}}
        isLogin={isLogin}
      />
    } else if(!isLogin && !isForgotPassword) {
      return <Register 
        renderLogin={() => {setIsLogin(true)}}
        isLogin={isLogin}
      />
    } else if(isLogin && isForgotPassword) {
      return <ForgotPassword 
        renderLogin={() => {setIsForgotPassword(false)}}
        isForgotPassword={isForgotPassword}
      />
    }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="customwidth bg-white border rounded shadow-lg">
        <div className="px-2 pt-5 pb-3 w-100">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

export default Landing;
