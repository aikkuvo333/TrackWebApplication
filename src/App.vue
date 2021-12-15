<template>
  <div id="app">
    <b-navbar id="nav" toggleable="lg" type="light" variant="light" >
      <b-container>
        <b-navbar-brand href="/">TRACK</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mr-auto" >
            <router-link to="/About" class="nav-item nav-link">About</router-link>
            <router-link to="/resepti" class="nav-item nav-link">Recipes</router-link>
            <router-link to="/treeni" class="nav-item nav-link">Workout</router-link>
            <router-link to="/omatili" class="nav-item nav-link">Account</router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data() {
    return {}
    }
}
</script>
<style>
.mr-auto{
  margin-left: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  border-bottom: 1px solid #2c3e50;
  padding-bottom: 2px;
}
</style>