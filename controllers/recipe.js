import Recipe from '../models/recipe.model.js'

const create = async (req, res, next) => {
  //get info from body
  const {recipe, ingredients, method, user} = req.body

  res.status(200).json({
    user: user,
    title: 'This is a test'
  })

  //handle errors

}

const update = async (req, res, next) => {

}

const read = async (req, res, next) => {

}

const remove = async (req, res, next) => {

}

export {create, update, read, remove}
