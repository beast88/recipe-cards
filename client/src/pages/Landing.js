import React, { useState, useEffect } from 'react'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ForgotPassword from '../components/auth/ForgotPassword'
import { useSpring, animated } from 'react-spring'
import { useMeasure } from 'react-use'

function Landing() {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const defaultHeight = '0'
  const [contentHeight, setContentHeight] = useState(defaultHeight)
  const [ref, {height}] = useMeasure()

  const expand = useSpring({
    config: {friction: 20},
    height: defaultHeight ? `${contentHeight}px` : defaultHeight,
    overflowY: 'hidden'
  })

  useEffect(() => {
    setContentHeight(height)

    window.addEventListener("resize", setContentHeight(height))

    return window.removeEventListener("resize", setContentHeight(height))
  }, [height])

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
      <div className="customwidth bg-white border rounded shadow-lg px-2 pt-5 pb-3 ">
        <animated.div className="w-100" style={expand}>
          <div ref={ref}>
            {renderForm()}
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default Landing;
