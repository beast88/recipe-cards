import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '../global/Button'
import { useTransition, animated } from 'react-spring'

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [confirmMessage, setConfirmMessage] = useState(false)
  const [error, setError] = useState(false)
  const isForgotPassword = props.isForgotPassword

  const fade = useTransition(isForgotPassword, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    },
    duration: 700,
    delay: 200
  })

  useEffect(() => {
    if(email !== '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email])

  const handleSubmit = () => {
    axios.post('http://localhost:3001/user/forgotpassword', {
      email: email
    })
    .then(res => {
      setConfirmMessage(true)
      setError(false)
      setEmail('')
    })
    .catch(err => {
      setError(true)
      setConfirmMessage(false)
    })
  }

  return(
    <>
      {fade((style, item) =>
        item ?
        <animated.div className="d-flex flex-column align-items-center px-2" style={style}>
          <h3 className="mb-3">Forgot Password</h3>

          <div className="w-100 mb-2">
            <p>Request a password reset email</p>
          </div>

          <div className="custom-form-group w-100 mb-3">
            <label className="bolder">email</label>
            <input
              className="input w-100 rounded p-2 mt-1" 
              type="email"
              value={email}
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-flex w-100 justify-content-center align-items-center mb-3">
            <Button
              handleClick={handleSubmit}
              buttonType={'text'}
              text={'Send'}
              disable={isDisabled} 
            />
          </div>

          <div className={`mb-3 text-center footnote ${!confirmMessage ? "d-none" : "d-block"}`}>
            <p>An email has been sent to you. If you do not see it immediately check your spam folder.</p>
          </div>

          <div className={`mb-3 footnote text-danger ${!error ? "d-none" : "d-block"}`}>
            <p><i className="fas fa-exclamation"></i> Your request could not be completed at this time.</p>
          </div>

          <div className="d-flex w-100 justify-content-start footnote">
            <p>Return to <span 
              className="text-primary cursor"
              onClick={props.renderLogin}
            >Login</span></p>
          </div>
        </animated.div>
        : ''
      )}
    </>
  )
}

export default ForgotPassword