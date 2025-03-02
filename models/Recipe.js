const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String } // optional field for the image URL
});

module.exports = mongoose.model('Recipe', RecipeSchema);
