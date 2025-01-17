let express = require("express");

const app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

async function getAllRecipes() {
  return recipes;
}

async function getRecipeById(id) {
  let result = recipes.find((ele) => ele.id === id);
  return result;
}

async function addNewRecipe(data) {
  let newRecipe = { id: recipes.length + 1, ...data };
  recipes.push(newRecipe);
  return newRecipe;
}

app.get("/recipes", async (req, res) => {
  let result = await getAllRecipes();
  return res.status(200).json(result);
});

app.get("/recipes/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getRecipeById(id);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({});
  }
});

app.post("/recipes/new", async (req, res) => {
  let newRecipe = req.body;
  let result = await addNewRecipe(newRecipe);
  return res.status(200).json(result);
});

module.exports = { app, getAllRecipes, getRecipeById, addNewRecipe };
