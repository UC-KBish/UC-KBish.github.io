import React, { useState } from 'react';
import data from '../data/recipes.json'

function sortRecipes(sortVal) {
  const RecipeContainer = document.getElementById('RecipeContainer')
  let column = 0;

  let len = RecipeContainer.children.item(0).childElementCount;

  for (let i = 0; i < len; i++) {
    RecipeContainer.children.item(2).appendChild(RecipeContainer.children.item(0).firstChild)
  }

  len = RecipeContainer.children.item(1).childElementCount;

  for (let i = 0; i < len; i++) {
    RecipeContainer.children.item(2).appendChild(RecipeContainer.children.item(1).firstChild)
  }

  sortVal = sortVal.toLowerCase();

  var re = new RegExp(sortVal, 'g');
  let addedRecipes = []

  // Test for the name of the recipe
  data.forEach((recipe, index) => {
    if (re.test(recipe.Name.toLowerCase())) {
      RecipeContainer.children.item(column).appendChild(document.getElementById('recipe-' + index))
      column = (column + 1) % 2;
      addedRecipes.push(index)
    }
  })

  // Test for the cuisine
  data.forEach((recipe, index) => {
    if (!(parseInt(index) in addedRecipes) && re.test(recipe.Cuisine.toLowerCase())) {
      RecipeContainer.children.item(column).appendChild(document.getElementById('recipe-' + index))
      column = (column + 1) % 2;
      addedRecipes.push(index)
    }
  })

  if (addedRecipes.length === 0) {
    document.getElementById('no-recipes').hidden = false;
  } else {
    document.getElementById('no-recipes').hidden = true;
  }
}

function SearchBar() {

  const [_, setInputValue] = useState("");

  const updateRecipes = (value) => {
    if (!value) {
      document.getElementById('RecipeSearchHeader').innerText = 'Popular Recipes'
      sortRecipes('')

    } else {
      document.getElementById('RecipeSearchHeader').innerText = 'Search: ' + value
      sortRecipes(value)
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    updateRecipes(newValue);
  };

  return (<input onChange={handleInputChange} id='RecipeSearchBar' type='text' placeholder='Search For Recipe' style={{ position: 'absolute', top: '40%', right: '25%', backgroundColor: "#FFFFFFC0", height: '15%', width: '50%', borderRadius: '5px', fontSize: '110%' }} />);
}

export default SearchBar

