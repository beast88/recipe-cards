import React, { useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring';

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 9,
  (x - rect.left - rect.width / 2) / 9,
  1.1
]

const trans = (x, y, s) => 
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;


const RecipeCard = (props) => {
  const {recipe, img, _id} = props.recipe
  const ref = useRef(null)
  const [xys, setxys] = useState([0, 0, 1])

  const wobble = useSpring({
    xys
  })

  const getStyle = () => {
    let background

    if (img === "") {
      background = {background: 'linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(15,57,37,1) 30%, rgba(25,135,84,1) 100%)'}
    } else {
      background = {
        background: `linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, .85) 100%), url(http://localhost:3001/recipe/images/${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50%"
      }
    }

    return background
  }

  return(
    <div ref={ref}>
      <animated.div 
        className="recipe-card cursor mb-4 mx-1 shadow"
        style={{transform: wobble.xys.to(trans)}}
          onMouseLeave={() => setxys([0, 0, 1])}
          onMouseMove={(e) => {
          const rect = ref.current.getBoundingClientRect()
          setxys(calc(e.clientX, e.clientY, rect))
        }}
        onClick={() => props.handleSelect(_id)}
      >
        <div 
          className="w-100 h-100 recipe-card-bg p-3 d-flex align-items-end"
          style={getStyle()}
        >
          <h2 className="text-white">{recipe}</h2>
        </div>
      </animated.div>
    </div>
  )
}

export default RecipeCard
