<template>
  <div class="home">
    <div v-if="userData.loggedIn">
      <HomeLoggedIn></HomeLoggedIn>
    </div>
    <div v-else>
    <slideshow></slideshow>
    <login/>
    </div>
  </div>
</template>

<script>
import login from '../components/login';
import slideshow from '../components/slideshow';
import HomeLoggedIn from './HomeLoggedIn';
export default {
  name: 'Home',
  data(){
    return{
      userData:[]
    }
  },
  mounted() {
    if (localStorage.getItem('data')) {
      try {
        this.userData = JSON.parse(localStorage.getItem('data'));
      } catch(e) {
        localStorage.removeItem('data');
      }
    }
  },
  components: {
    login,
    slideshow,
    HomeLoggedIn
  }
}
</script>