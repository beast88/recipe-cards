import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema ({
  recipe: {type: String},
  ingredients: {type: Array},
  method: {type: String},
  img: {type: String},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
