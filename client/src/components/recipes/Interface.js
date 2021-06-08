import React from 'react'

const Interface = (props) => {

  return(
    <div className="text-center p-3 fixed-bottom">
      <button 
        className="btn btn-success rounded-circle shadow"
        onClick={() => props.renderCreateForm()}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}

export default Interface