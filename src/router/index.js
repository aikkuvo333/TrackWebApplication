import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import resepti from '../views/resepti';
import treeni from '../views/treeni';
import omatili from '../views/omatili';
import RecipeDetail from '../views/RecipeDetail';
import HomeLoggedIn from '../views/HomeLoggedIn';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/loggedin',
    name: 'HomeLoggedIn',
    component: HomeLoggedIn,
  },
  {
    path: '/about',
    name: 'About',
    component: About

  },
  {
    path: '/resepti',
    name: 'resepti',
    component: resepti
  },
  {
    path: '/resepti/:id',
    name: 'recipe-detail',
    component: RecipeDetail,
    props:true
  },
  {
    path: '/treeni',
    name: 'treeni',
    component: treeni
  },
  {
    path: '/omatili',
    name: 'omatili',
    component: omatili
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router