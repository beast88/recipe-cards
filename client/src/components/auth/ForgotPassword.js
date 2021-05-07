import React, { useState, useEffect } from 'react'

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if(email !== '') {
      setIsDisabled(false)
    }
  }, [email])

  return(
    <div className="d-flex flex-column align-items-center px-2">
      <h3 className="mb-3">Forgot Password</h3>

      <div className="w-100 mb-2">
        <p>Request a password reset email</p>
      </div>

      <div className="w-100 mb-3">
        <label className="bolder">email</label>
        <input
          className="w-100 rounded border border-info p-2 mt-1" 
          type="email"
          value={email}
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="d-flex w-100 justify-content-center align-items-center mb-2">
        <button
          className={`border border-success px-2 py-1 rounded ${isDisabled ? "bg-secondary" : "bg-success"} text-white`}
          disabled={isDisabled}
        >Send</button>
      </div>

      <div className="d-flex w-100 justify-content-start footnote">
        <p>Return to <span 
          className="text-primary cursor"
          onClick={props.renderLogin}
        >Login</span></p>
      </div>
  </div>
  )
}

export default ForgotPassword