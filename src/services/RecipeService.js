//API kutsut resepteille ja ruoka ainesosille
/*
* @author Aivan Vo*/

import axios from 'axios';

const apiService = axios.create({ //instanssi
  baseURL: 'https://api.spoonacular.com',
  headers: {
    Accept:"application/json",
    "Content-Type": "application/json"
  }
});

const apiKey = '9b88bb421b274e378823ee925824fd5b';

//Funktiot, hakee reseptit kategorian mukaan
const recipeOne = apiService.get(`/recipes/search?type=breakfast&apiKey=` + apiKey + `&includeNutrition=true`)
const recipeTwo = apiService.get(`/recipes/search?type=main course&apiKey=` + apiKey + `&includeNutrition=true`)
const recipeThree = apiService.get(`/recipes/search?type=snack&apiKey=` + apiKey + `&includeNutrition=true`)

export default {
  /*Palauttaa yhden aamupalan, päivällisen ja iltapalan*/
  getCourseType(){
    return axios.all([recipeOne, recipeTwo, recipeThree])
  },
  /*Haetaan reseptin tarkemmat tiedot RecipeDetailiin*/
  getRecipeInfo(recipeId){
    return apiService.get(
        `/recipes/`+ recipeId + `/information?apiKey=` + apiKey + `&includeNutrition=false`
    )
  },
  /*Hakee halutun ruoka-aineen id ruoka-aineen nimellä*/
  getIngredientId(productName){
    return apiService.get(
        `food/ingredients/search?query=`+ productName + `&apiKey=` + apiKey
    )
  },
  /*Hakee arvot (kalorit) ruoka ainesosasta*/
  getIngredientInfo(ingredientId){
    return apiService.get(
        `food/ingredients/`+ ingredientId + `/information?amount=1&apiKey=` + apiKey
    )
  }
}