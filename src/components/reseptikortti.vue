<template>
  <div class="recipe-card">
    <router-link :to="{name:'recipe-detail', params:{id: recipe.id}}"> <!--vie klikatun reseptiotsikon sivulle-->
    <h2 class="recipe-title">{{recipe.title}}</h2>
    </router-link>
    <span class="recipe-quick-info">
      <span>
          <time>Cooking Time: {{recipe.readyInMinutes}} Min</time>
      </span>
      <span>
          <small>Serving size: {{recipe.servings}} Servings</small>
      </span>
    </span>
  </div>
</template>

<script>
export default {
name: "reseptikortti",
  props:{
  recipe: Object
  }
}
</script>

<style scoped>
.recipe-card { /*reseptikortti*/
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  border: 1px solid lightgray;
  color: black;
  border-radius: 3px;
  align-items: flex-start;
}

.recipe-card:hover { /*hiiri kortin päällä*/
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}

.recipe-title { /*reseptin otsikko*/
  color: black;
  font-weight: 700;
  font-size: 16px;
  line-height: 2;
  margin: 0;
}

.recipe-quick-info > span { /*kortin otsikon alla oleva lisätieto*/
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
}
</style>