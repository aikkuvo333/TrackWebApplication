<template>
  <div class="card-container">
    <div class="card">
      <div class="recipe-card">
        <div class="recipe-card-image">
          <img :src="recipe.image" alt="picture of food">
        </div>
        <div class="recipe-card-content">
          <router-link to="/resepti"> <!--vie yksi sivu taaksepäin-->
            <a>Back</a>
          </router-link>
          <h2 class="recipe-type">{{recipe.dishTypes[0]}}</h2>
          <h1 class="recipe-title">{{recipe.title}}</h1>
          <ul class="recipe-stats">
            <li class="recipe-stats-item">
              <h2>{{recipe.readyInMinutes}}</h2>
              <p>Mins</p>
            </li>
            <li class="recipe-stats-item">
              <h2>{{recipe.servings}}</h2>
              <p>servings</p>
            </li>
            <li class="recipe-stats-item">
              <h2>{{recipe.diets.toString()}}</h2>
              <p>Diets</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="recipe-details">
        <div class="recipe-summary">
          <h2>Methods</h2>
          <p>{{recipe.instructions}}</p>
        </div>
        <div class="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>
            <li v-for="ingridients in recipe.extendedIngredients" :key="ingridients.id">
              {{ingridients.original}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getRecipeDetail from '../services/RecipeService'
export default {
name: "RecipeDetail",
  data(){
  return{
    recipe:[]
  }
  },
  props:["id"],
  created() {
    getRecipeDetail.getRecipeInfo(this.id).then(res => {
      this.recipe = res.data;
      console.log("GET RECIPE DETAIL", this.recipe);
    })
  }
}
</script>

<style scoped>
.card-container {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}

.recipe-card { /*yläpalkkineliö*/
  position: relative;
  background: #ffffff;
  width: fit-content;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.recipe-card-image > img { /*kuva*/
  object-fit: fill;
  margin: 2rem;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}

.recipe-card-content { /*yläpalkin sisältö*/
  -webkit-box-flex: 1;
  flex-grow: 1;
  padding: 30px 50px 0;
}

.recipe-type { /*reseptityyppi*/
  font-family: "mr-eaves-xl-modern", sans-serif;
  font-weight: 200;
  text-transform: uppercase;
  color: #8d8d8d;
  letter-spacing: 5px;
  font-size: 16px;
}

.recipe-title {
  margin: 25px 0 20px;
  text-transform: capitalize;
  font-size: 30px;
  font-weight: 200;
  color: #3b3b3b;
  -webkit-font-smoothing: subpixel-antialiased;
  line-height: 1;
}

.recipe-stats {
  display: -webkit-box;
  display: flex;
  margin-top: 20px;
  list-style: none;
}
/*yläpalkki: palkeissa olevat aikatiedot*/
.recipe-stats-item {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #e1e1e1;
}
.recipe-stats-item:first-child {
  border-left: 1px solid #e1e1e1;
  padding-left: 20px;
}

.recipe-stats-item h2 {
  font-size: 22px;
  font-weight: 400;
  color: #3b3b3b;
}

/*alapalkki*/
.recipe-details {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  width: inherit;
  height: 475px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
.recipe-summary {
  max-width: 400px;
  height: calc(100% - 60px);
  overflow-y: scroll;
  margin: 30px 0 60px;
  padding: 0 20px 0 90px;
}
.recipe-summary > h2 {
  margin: 0 0 20px;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 300;
  color: #3b3b3b;
  -webkit-font-smoothing: subpixel-antialiased;
  line-height: 25px;
}

/*Ingredients osio*/
.recipe-ingredients { /*asettelu*/
  -webkit-box-flex: 1;
  flex-grow: 1;
  padding: 30px 50px;
}
.recipe-ingredients h2 { /*otsikko*/
  margin: 0 0 20px;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 300;
  color: #3b3b3b;
  -webkit-font-smoothing: subpixel-antialiased;
  line-height: 25px;
}

.recipe-ingredients li { /*lista*/
  margin-bottom: 10px;
  line-height: 20px;
}
</style>