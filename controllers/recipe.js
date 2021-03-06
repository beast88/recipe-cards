import Recipe from '../models/recipe.model.js'
import { uploadFile, getFileStream, deleteFile } from '../utils/s3.js'
import { unlinkFile } from '../utils/removeImg.js'

const create = async (req, res, next) => {
  const {recipe, method} = req.body
  const ingredients = JSON.parse(req.body.ingredients)
  let img

  if(req.file === undefined) {
    img = ""
  } else {
    img = req.file.filename
    
    await uploadFile(req.file)
    await unlinkFile(req.file.path)
  }

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
  const {recipe, method, id} = req.body
  const ingredients = JSON.parse(req.body.ingredients)
  const prevImg = req.body.prevImg
  let img

  if(req.file === undefined) {
    img = prevImg
  } else {
    img = req.file.filename

    await uploadFile(req.file)
    await unlinkFile(req.file.path)

    //Delete old image from S3
    if(prevImg !== "") {
      const fileName = prevImg
      await deleteFile(fileName)
    }
  }

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
  const userName = req.user.firstName

  try {

    const recipes = await Recipe.find({createdBy: userId})

    if(!recipes) {
      res.status(204).json({
        title: 'Success',
        data: [],
        user: userName,
        message: 'No recipes stored for this user'
      })
    }

    res.status(200).json({
      title: 'Success',
      data: recipes,
      user: userName
    })
    
  } catch (err) {
    res.status(500).json({
      title: 'Server error',
      error: err
    })
  }
}

const getImages = async (req, res, next) => {
  const key = req.params.key

  const readStream = getFileStream(key)
  readStream.pipe(res)
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

    //delete the image from s3 bucket
    let fileName
    if(recipe.img === "" || recipe.img === undefined) {
      fileName = null
    } else {
      fileName = recipe.img
    }

    if(fileName !== null) {
      await deleteFile(fileName)
    }

    res.status(200).json({
      title: 'Recipe removed',
      data: recipe
    })
    
  } catch (err) {
    console.log(err)
    res.status(500).json({
      title: 'Server error',
      error: err
    })
  }

}

export {create, update, read, remove, getImages}
