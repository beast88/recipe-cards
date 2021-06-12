import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Register = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState(false)
  const [shortPassword, setShortPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  useEffect(()=> {
    if(password === confirmPassword && password !== ''){
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [password, confirmPassword])

  useEffect(() => {
    if(password !== '' && password.length < 6) {
      setShortPassword(true)
    } else {
      setShortPassword(false)
    }
  }, [password])

  useEffect(() => {
    if(email !== '' && validateEmail(email) === false) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }, [email])

  const handleSubmit = () => {
    axios.post('http://localhost:3001/user/register', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token)
      window.location.href = '/dashboard'
    })
    .catch(err => {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setError(true)
    })
  }

  return(
    <div className="d-flex flex-column align-items-center px-2">
      <h3 className="mb-3">Register</h3>

      <div className="custom-form-group w-100 mb-3">
        <label className="bolder">first name *</label>
        <input
          className="input w-100 rounded p-2 mt-1" 
          type="text"
          value={firstName}
          placeholder="John"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="custom-form-group w-100 mb-3">
        <label className="bolder">last name *</label>
        <input
          className="input w-100 rounded p-2 mt-1" 
          type="text"
          value={lastName}
          placeholder="Smith"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="custom-form-group w-100 mb-3">
        <label className="bolder">email *</label>
        <input
          className={`input w-100 rounded ${!emailError ? "" : "input-error border border-danger"} p-2 mt-1`} 
          type="email"
          value={email}
          placeholder="example@email.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="custom-form-group w-100 mb-3">
        <label className="bolder">password *<span className="footnote text-secondary"> (min 6 characters)</span></label>
        <input
          className={`input w-100 rounded ${!shortPassword ? "" : "input-error border border-danger"} p-2 mt-1`} 
          type="password"
          value={password}
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="custom-form-group w-100 mb-3">
        <label className="bolder">confirm password *</label>
        <input
          className="input w-100 rounded p-2 mt-1" 
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

      <div className="d-flex w-100 justify-content-between align-items-center mb-3">
        <div className="footnote">
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
          onClick={handleSubmit}
        >Register</button>
      </div>

      <p className={`text-danger ${!error ? "d-none" : "d-block"}`}><i className="fas fa-exclamation"></i> Email has already been registered</p>
    </div>
  )
}

export default Register