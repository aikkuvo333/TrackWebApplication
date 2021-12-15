<template>
  <div class="hello">
    <div v-if="userData.loggedIn" class="loggedin">
      <div class="info">
      <h2>User Information</h2>
      <br>
      <table class="card">
        <tbody>
        <tr>
          <td>Username</td>
          <td>:</td>
          <td>{{userData.username}}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>:</td>
          <td>{{userData.gender}}</td>
        </tr>
        <tr>
          <td>Activity Level</td>
          <td>:</td>
          <td>{{userData.activity}}</td>
        </tr>
        <tr>
          <td>Calorie consumption</td>
          <td>:</td>
          <td>{{calories + ' kcal'}}</td>
        </tr>
        </tbody>
      </table>
      <button @click="signOut" class="button-12">Sign out</button>
      </div>
    </div>
    <div v-else>
      Please log in to view your user information.
    </div>
  </div>
</template>

<script>
export default {
name: "omatili",
  data(){
    return{
      userData:[],
      calories:null
    }
  },
  mounted(){
  //hakee käyttäjädatan tällä hetkellä kirjautuneesta käyttäjästä ja laskee hänelle kaloritavoitteen
    if (localStorage.getItem('data')) {
      try {
        this.userData = JSON.parse(localStorage.getItem('data'));
        if (this.userData.gender === "Male") {
          if (this.userData.activity === "Active") {
            this.calories = 3400;
          }
          else if(this.userData.activity === "Average"){
            this.calories= 3000;
          }
          else if(this.userData.activity === "Unactive"){
            this.calories= 2600;
          }

        }else if(this.userData.gender === "Female"){
          if (this.userData.activity === "Active") {
            this.calories = 3000;
          }
          else if(this.userData.activity === "Average"){
            this.calories= 2600;
          }
          else if(this.userData.activity === "Unactive"){
            this.calories= 2400;
          }
        }

      } catch(e) {
        localStorage.removeItem('data');
      }
    }
  },
  methods:{
  //kirjautuu ulos
  signOut(){
    localStorage.clear();
    location.href = "/";
  }
  }
}
</script>

<style scoped>
.loggedin{
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 1px 1px 8px 1px grey;
  height: auto;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0 20px 50px;
  width: 80%;
}

.card{
  border: none;
  font-size: 16px;
  height: 270px;
  width: 25%;
  margin: auto;
  padding-top: 40px;
}

.button-12 {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: #494d52;
  color: #DFDEDF;
}

.button-12:focus {
  outline: 0;
}
</style>