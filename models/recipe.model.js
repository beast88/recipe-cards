import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema ({
  recipe: {type: String},
  ingrediants: {type: Array},
  method: {type: String},
  img: {type: String}
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
