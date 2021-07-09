import axios from 'axios'
import React, { useState } from 'react'
import Button from '../global/Button'
import { useTransition, animated } from 'react-spring'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const isLogin = props.isLogin

  const fade = useTransition(isLogin, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    },
    duration: 700
  })

  const handleSubmit = () => {
    axios.post('http://localhost:3001/user/login', {
      email: email,
      password: password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token)
      window.location.href = '/dashboard'
    })
    .catch(err => {
      setEmail('')
      setPassword('')
      setError(true)
    })
  }

  return(
    <>
      {fade((style, item) => 
        item ?
        <animated.div className="d-flex flex-column align-items-center px-2" style={style}>
          <h3 className="mb-3">Login</h3>

          <div className="custom-form-group w-100 mb-3">
            <label className="bolder">email</label>
            <input
              className="input rounded w-100 p-2 mt-1" 
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="custom-form-group w-100 mb-3">
            <label className="bolder">password</label>
            <input
              className="input w-100 rounded p-2 mt-1" 
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex w-100 justify-content-between align-items-center mb-2">
            <div className="footnote">
              <p>Need an account? <span 
                  className="text-primary cursor"
                  onClick={props.renderRegister}
                >Register</span>
              </p>
            </div>

            <Button
              handleClick={handleSubmit}
              buttonType={'text'}
              text={'Login'}
              disable={false}
            />
          </div>

          <div className="d-flex w-100 justify-content-start footnote mb-3">
            <p className="text-primary cursor"
              onClick={props.renderForgotPassword}
            >
            Forgot password?</p>
          </div>

          <p className={`text-danger ${!error ? "d-none" : "d-block"}`}><i className="fas fa-exclamation"></i> Invalid username/password</p>
        </animated.div>
        : ''
      )}
    </>
  )
}

export default Login