import React from 'react'
import { useTransition, animated } from 'react-spring'

const GetIngredients = ({ingredients, handleRemoveIngredient}) => {

  const transition = useTransition(ingredients, {
    from: {
      opacity: 0,
      y: 100
    },
    enter: {
      opacity: 1,
      y: 0
    },
    leave: {
      opacity: 0,
      y: 100
    },
    keys: ingredients.map((item, index) => index)
  })

  return(
    <>
      {
        transition((style, item, key) => (
          <animated.li
            key={key}
            style={style}
            className="d-flex justify-content-between align-items-center"
          >
            {item}
            <i 
              className="fa fa-trash cursor"
              onClick={() => handleRemoveIngredient(key.key)}
            ></i>
          </animated.li>
        ))
      }

    </>
  )
}

export default GetIngredients
