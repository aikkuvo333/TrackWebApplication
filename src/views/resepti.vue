<template>
  <div class="container">
    <div class="board-wrapper">
      <div>
        <h1>Breakfast</h1>
        <reseptikortti v-for="recipe in recipes[0].data.results" :key="recipe.id" :recipe="recipe"></reseptikortti>
      </div>
      <div>
        <h1>Dinner</h1>
        <reseptikortti v-for="recipe in recipes[1].data.results" :key="recipe.id" :recipe="recipe"></reseptikortti>
      </div>
      <div>
        <h1>Snack</h1>
        <reseptikortti v-for="recipe in recipes[2].data.results" :key="recipe.id" :recipe="recipe"></reseptikortti>
      </div>
    </div>
  </div>
</template>

<script>
import reseptikortti from '../components/reseptikortti';
import getCourseType from '../services/RecipeService';
import axios from 'axios';
export default {
  name: "resepti",
  components: {reseptikortti},
  data() {
    return{
      recipes:[]
    }
  },
  created() {
    getCourseType.getCourseType()
    .then( //funktiosta saadaan kolme arvoa jotka erotetaan toisistaan
        axios.spread((...res) => {
          this.recipes = res; //tallennetaan saatu res taulukkoon
          console.log('RESPONSE', res);
        })
    )
    .catch(error => {
      console.log('error in fetching courses data from api', error)
    })
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.board-wrapper { /*headerien asettelu*/
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw; /* lisätty css */
}

.board-wrapper > div > h1 { /*headerit*/
  position: relative;
  padding: 1.3rem 0;
  background: white;
  margin-top: 0;
  color: black;

  border-bottom: 14px solid white;
}

@media (min-width: 600px) {
  .board-wrapper > div {
    margin: 10px;
    width: 360px;
  }
}

@media (max-width: 599px) {
  .board-wrapper > div + div {
    margin-top: 20px;
  }
}

.board-wrapper > div { /*reseptikorttien takaosa*/
  background: transparent;

}
</style>