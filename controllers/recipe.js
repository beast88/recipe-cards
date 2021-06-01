import Recipe from '../models/recipe.model.js'

const create = async (req, res, next) => {
  const {recipe, ingredients, method, img} = req.body
  const userId = req.user._id

  try {
    //Save recipe to database
    const newRecipe = await Recipe.create({
      recipe,
      ingredients,
      method,
      img,
      createdBy: userId
    })

    //Send response
    res.status(201).json({
      title: 'Recipe created successfully',
      data: newRecipe
    })

  } catch (err) {
    res.status(500).json({
      title: 'Server error',
      error: err
    })
  }
}

const update = async (req, res, next) => {
  const {recipe, ingredients, method, img, id} = req.body

  try {
    const updateRecipe = await Recipe.findOne({_id: id})

    if(!updateRecipe) {
      res.status(404).json({
        title: 'Not recipe found'
      })
    }

    updateRecipe.recipe = recipe
    updateRecipe.ingredients = ingredients
    updateRecipe.method = method
    updateRecipe.img = img

    await updateRecipe.save()

    res.status(201).json({
      title: 'Recipe updated',
      data: updateRecipe
    })

  } catch (err) {
    res.status(500).json({
      title: 'Server error',
      error: err
    })
  }
}

const read = async (req, res, next) => {
  const userId = req.user._id

  try {

    const recipes = await Recipe.find({createdBy: userId})

    if(!recipes) {
      res.status(204).json({
        title: 'Success',
        data: null,
        message: 'No recipes stored for this user'
      })
    }

    res.status(200).json({
      title: 'Success',
      data: recipes
    })
    
  } catch (err) {
    res.status(500).json({
      title: 'Server error',
      error: err
    })
  }
}

const remove = async (req, res, next) => {
  const {id} = req.body
  const userId = req.user._id

  try {

    const recipe = await Recipe.findOneAndDelete({createdBy: userId, _id: id})

    if(!recipe) {
      res.status(404).json({
        title: 'No recipe found'
      })
    }

    res.status(200).json({
      title: 'Recipe removed',
      data: recipe
    })
    
  } catch (err) {
    res.status(500).json({
      title: 'Server error',
      error: err
    })
  }

}

export {create, update, read, remove}
