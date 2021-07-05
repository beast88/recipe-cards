import React from 'react'
import Button from '../global/Button'

const Interface = (props) => {

  return(
    <div className="text-center p-3 fixed-bottom shadow">
      <Button
        handleClick={props.renderCreateForm}
        buttonType={'icon-green'}
        text={<i className="fas fa-plus"></i>}
        disable={false} 
      />
    </div>
  )
}

export default Interface
