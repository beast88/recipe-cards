import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = ( {match} ) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [shortPassword, setShortPassword] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

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

  const handleSubmit = () => {
    axios.put(`http://localhost:3001/user/passwordreset/${match.params.resetToken}`, {
      password: password
    })
    .then(res => {
      setPassword('')
      setConfirmPassword('')
      setSuccess(true)

      setTimeout(() => {
        window.location.href = '/'
      }, 5000)
    })
    .catch(err => {
      setPassword('')
      setConfirmPassword('')
      setError(true)
    })
  }

  return(
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="customwidth bg-white border rounded shadow-lg">
        <div className="px-2 pt-5 pb-3 w-100">
          <div className="d-flex flex-column align-items-center px-2">
            <h3 className="mb-3">Reset Password</h3>

            <div className="custom-form-group w-100 mb-3">
              <label className="bolder">new password<span className="footnote text-secondary"> (min 6 characters)</span></label>
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
              <label className="bolder">confirm new password</label>
              <input
                className="input w-100 rounded p-2 mt-1" 
                type="password"
                value={confirmPassword}
                placeholder="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-flex w-100 justify-content-center align-items-center mb-3">
              <button
                className={`${isDisabled ? "bg-secondary" : "bg-success"} border border-success px-2 py-1 rounded text-white`}
                disabled={isDisabled}
                onClick={handleSubmit}
              >Update Password</button>
            </div>

            <p className={`text-danger ${!error ? "d-none" : "d-block"}`}><i className="fas fa-exclamation"></i> Your request could not be completed at this time</p>

            <p className={`text-success ${!success ? "d-none" : "d-block"}`}><i className="fas fa-exclamation"></i> Password updated, you will be redirected to the Login page</p>

            <div className="d-flex w-100 justify-content-start">
              <Link to="/"><p className="text-info cursor">Login</p></Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword