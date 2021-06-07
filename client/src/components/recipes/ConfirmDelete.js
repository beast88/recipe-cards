import React from 'react'
import axios from 'axios'

const ConfirmDelete = (props) => {

  const confirm = () => {
    axios.delete('http://localhost:3001/recipe/delete', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      data: {
        id: props.id
      }
    })
    .then(res => {
      props.handleDelete(props.id)
    })
    .catch(err => {
      alert('Session has timed out!')
      window.location.href = '/'
    })
  }

  return(
    <div className="confirm-delete-container d-flex justify-content-center align-items-center">
      <div className="confirm-delete bg-white shadow rounded p-3 d-flex flex-column align-items-center justify-content-around">
        <h3>Delete this recipe?</h3>

        <div className="w-100 d-flex justify-content-around">
          <button 
            className="btn btn-danger shadow"
            onClick={() => confirm()}                      
          >Delete</button>

          <button 
            className="btn btn-success shadow"
            onClick={() => props.handleCancel()}
          >Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
