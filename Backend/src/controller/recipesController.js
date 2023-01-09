const Recipe = require("../models/Recipe")

//get all recipes
module.exports.recipes = async (req, res) => {
  const getRecipes = await Recipe.find().populate({
    path: 'creator_id',
    options: { strictPopulate: true }
  });

  if (!getRecipes) {
    return res.status(404).json({ success: false, message: "Data not found!" })
  }

  res.status(200).json({ success: true, recipes: getRecipes })
}



//get process based on given id
module.exports.recipeDetails = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(403).json({ success: false, message: "please provide recipe id" })
  }

  const data = await Recipe.aggregate([
    {
      $match: { _id: id }
    },
    {
      $lookup: {
        from: 'processes',
        localField: '_id',
        foreignField: 'recipe_id',
        as: 'process'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'creator_id',
        foreignField: '_id',
        as: 'creator'
      }
    },  {
      $unwind: '$creator',
    },
    {
      $lookup: {
        from: 'ingredients',
        localField: '_id',
        foreignField: 'recipe_id',
        as: 'ingredients'
      },
    }, {
      $project: {__v:0,_id:0,creator_id:0,
        "ingredients.__v": 0, "ingredients._id": 0, "ingredients.recipe_id": 0,
        "process.__v": 0, "process._id": 0, "process.recipe_id": 0,
        "creator.__v":0,"creator._id":0,"creator.user_id":0,"creator.password":0
      }
    }]
)

  if (!data) {
    return res.status(404).json({ success: false, message: "data not found" })
  }

  res.status(200).json({ success: true, data:data[0] })
}