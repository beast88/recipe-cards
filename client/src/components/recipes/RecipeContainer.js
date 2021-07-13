import React from 'react'
import FullRecipe from './FullRecipe'
import CreateRecipeForm from './CreateRecipeForm'
import EditRecipeForm from './EditRecipeForm'
import { useTransition, animated } from 'react-spring'

const RecipeContainer = ({
  selectedRecipe, 
  showRecipe,
  handleEdit,
  closeCard, 
  handleDelete,
  showEdit,
  handleEditRecipe,
  closeEditForm,
  showForm,
  addRecipe,
  closeForm
}) => {

  const fullRecipeTransition = useTransition(showRecipe, {
    from: {
      y: 500,
      opacity: 0
    },
    enter: {
      y: 0,
      opacity: 1
    },
    leave: {
      y: -500,
      opacity: 0
    },
    config: {friction: 10}
  })

  const editTransition = useTransition(showEdit, {
    from: {
      y: 500,
      opacity: 0
    },
    enter: {
      y: 0,
      opacity: 1,
    },
    leave: {
      y: -500,
      opacity: 0
    },
    config: {friction: 10}
  })

  const formTransition = useTransition(showForm, {
    from: {
      y: 500,
      opacity: 0
    },
    enter: {
      y: 0,
      opacity: 1
    },
    leave: {
      y: -500,
      opacity: 0
    },
    config: {friction: 10}
  })

  return(
    <>
      {
        fullRecipeTransition((styles, item) =>
          item && <animated.div style={styles} className="px-3 position-relative change-opacity">
            <FullRecipe 
              details={selectedRecipe} 
              closeCard={closeCard}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </animated.div> 
        )
      }

      {
        editTransition((styles, item) =>
          item && <animated.div style={styles} className="px-3 position-relative">
            <EditRecipeForm 
              selectedRecipe={selectedRecipe}
              closeEditForm={closeEditForm}
              handleEditRecipe={handleEditRecipe}
            />
          </animated.div> 
        )
      }

      {
        formTransition((styles, item) =>
          item && <animated.div style={styles}>
            <CreateRecipeForm
              closeForm={closeForm}
              addRecipe={addRecipe}
            />
          </animated.div> 
        )
      }
    </>
  )
}

export default RecipeContainer
