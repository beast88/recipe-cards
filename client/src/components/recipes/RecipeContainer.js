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
      transform: 'translateY(100%)'
    },
    enter: {
      transform: 'translateY(0)'
    }
  })

  const editTransition = useTransition(showEdit, {
    from: {
      transform: 'translateY(100%)'
    },
    enter: {
      transform: 'translateY(0)'
    }
  })

  const formTransition = useTransition(showForm, {
    from: {
      transform: 'translateY(100%)'
    },
    enter: {
      transform: 'translateY(0)'
    }
  })

  return(
    <>
      {
        fullRecipeTransition((styles, item) =>
          item && <animated.div style={styles}>
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
          item && <animated.div style={styles}>
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
