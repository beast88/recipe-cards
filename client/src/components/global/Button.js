import React, { useState } from 'react'
import {useSpring, animated} from 'react-spring'

const Button = (props) => {
  const [isScaled, setIsScaled] = useState(false)

  const scale = useSpring({
    transform: isScaled ? 'scale(1.15)' : 'scale(1)',
    config: {friction: 10}
  })

  const trigger = () => {
    setIsScaled(true)
  }

  const untrigger = () => {
    setIsScaled(false)
  }

  const getStyles = () => {
    const type = props.buttonType
    let styles

    switch(type) {
      case 'text':
        styles = `border border-success px-2 py-1 rounded ${props.disable ? "bg-secondary" : "bg-success"} text-white`;
        break;
      case 'icon-green':
        styles = 'btn btn-success rounded-circle shadow';
        break;
      case 'icon-dark':
        styles = 'card-button rounded-circle shadow';
        break;
      case 'text-red':
        styles = 'btn btn-danger shadow';
        break;
      case 'text-green':
        styles = 'btn btn-success shadow';
        break;
      default:
        styles = null;
    }

    return styles
  }

  return(
    <animated.button 
      className={getStyles()}
      onMouseEnter={trigger}
      onMouseLeave={untrigger}
      style={scale}
      onClick={(e) => {props.handleClick(e)}}
      disabled={props.disable}
    >
      {props.text}
    </animated.button>
  )
}

export default Button
