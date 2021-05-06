import React, { useState, useEffect } from 'react'

const Register = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(()=> {
    if(password === confirmPassword && password !== ''){
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [password, confirmPassword])

  return(
    <div className="d-flex flex-column align-items-center px-2">
      <h3>Register</h3>

      <div className="w-100 mb-3">
        <label>first name *</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
          type="text"
          value={firstName}
          placeholder="first name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="w-100 mb-3">
        <label>last name *</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
          type="text"
          value={lastName}
          placeholder="last name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="w-100 mb-3">
        <label>email *</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
          type="email"
          value={email}
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-100 mb-3">
        <label>password *</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
          type="password"
          value={password}
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="w-100 mb-3">
        <label>confirm password *</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
          type="password"
          value={confirmPassword}
          placeholder="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-start w-100 mb-3">
        <p className="text-left text-secondary footnote">* required field</p>
      </div>

      <div className="d-flex w-100 justify-content-between align-items-center">
        <div>
          <p 
            className="text-primary cursor"
            onClick={props.renderLogin}
          >
            Login
          </p>
        </div>

        <button
          className={`${isDisabled ? "bg-secondary" : "bg-success"} border border-success px-2 py-1 rounded text-white`}
          disabled={isDisabled}
        >Register</button>
      </div>
    </div>
  )
}

export default Register