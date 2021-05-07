import axios from 'axios'
import React, { useState } from 'react'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    })
  }

  return(
    <div className="d-flex flex-column align-items-center px-2">
      <h3 className="mb-3">Login</h3>

      <div className="w-100 mb-3">
        <label className="bolder">email</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-100 mb-3">
        <label className="bolder">password</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
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

        <button
          className="border border-success px-2 py-1 rounded bg-success text-white"
          onClick={handleSubmit}
        >Login</button>
      </div>

      <div className="d-flex w-100 justify-content-start footnote">
        <p>Forgot your password? <span 
          className="text-primary cursor"
          onClick={props.renderForgotPassword}
        >Click here</span></p>
      </div>
    </div>
  )
}

export default Login