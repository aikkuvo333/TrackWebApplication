<template>
  <div class="login">
  <form v-if="!userData.loggedIn" onsubmit="return false">
    <h3>Log in</h3>

    <div class="form-group">
      <label>Username</label>
      <input type="text" pattern=".{4,12}" class="form-control form-control-lg" v-model="username"/>
    </div>
    <p class="errors" v-if="signInNameError">{{signInNameErrorText}}</p>

    <div class="form-group">
      <label>Password</label>
      <input type="password" pattern=".{4,12}" class="form-control form-control-lg" v-model="password"/>
    </div>
    <p class="errors" v-if="signInPasswordError">{{signInPasswordErrorText}}</p>

    <button @click="signIn" class="btn btn-dark btn-lg btn-block">Log in</button>


  </form>
    <br>
    <br>
    <form v-if="!userData.loggedIn" onsubmit="return false">
      <h3>Create new user</h3>

      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control form-control-lg" v-model="newUsername" />
      </div>
      <br>
      <p class="errors" v-if="nameError">{{nameErrorText}}</p>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model="newPassword"/>
      </div>
      <br>
      <p class="errors" v-if="passwordError">{{passwordErrorText}}</p>

      <div class="form-group">
        <label>Biological gender</label>
        <br>
        <input type="radio" id="mies" name="gender" value="Male" v-model="gender">
        <label for="mies">Male</label>
        <br>
        <input type="radio" id="nainen" name="gender" value="Female" v-model="gender">
        <label for="nainen">Female</label>
        <br>
        <p class="errors" v-if="genderError">{{genderErrorText}}</p>

      </div>
      <div class="form-group">
        <label>Activity level</label>
        <br>
        <input type="radio" id="one" value="Unactive" name="activity" v-model="activity">
        <label for="one"> Unactive</label>
        <br>
        <input type="radio" id="two" value="Average" name="activity" v-model="activity">
        <label for="two">Average</label>
        <br>
        <input type="radio" id="three" value="Active" name="activity" v-model="activity">
        <label for="three">Active</label>
        <br>
        <p class="errors" v-if="activityError">{{activityErrorText}}</p>

      </div>

      <button @click="signUp" class="btn btn-dark btn-lg btn-block">Sign up</button>



    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "login",
  data(){
    return{
      username: "",
      password: "",
      newUsername:"",
      newPassword:"",
      gender: "",
      activity: "",
      userData: [],
      nameError: false,
      passwordError: false,
      genderError: false,
      activityError: false,
      nameErrorText : "Username must be 4-12 characters long!",
      passwordErrorText: "Password must be 4-12 characters long!",
      genderErrorText: "Please choose gender",
      activityErrorText: "Please choose activity level",
      signInNameError: false,
      signInPasswordError: false,
      signInNameErrorText: "Username must be 4-12 characters long!",
      signInPasswordErrorText: "Password must be 4-12 characters long!"

    }
  },
  mounted() {
      if (localStorage.getItem('data')) { //haetaan käyttäjä tiedot jos on jo kirjautunut sisään
        try {
          this.userData = JSON.parse(localStorage.getItem('data'));
        } catch(e) {
          localStorage.removeItem('data'); // virhe tilanteessa poistetaan session tiedot
        }
      }
  },
  methods: {
    signUp: async function(){

      this.nameError = false;       //kaikki virheet ensin pois.
      this.passwordError = false;
      this.genderError = false;
      this.activityError = false;

      if(this.newUsername.length <4 || this.newUsername.length >12){ // käydään kaikki kohdat läpi ja ilmoitetaan käyttäjälle client puolen virheistä
        this.nameError = true;
        //pattern=".{4,12}"
        return;
      } else if(this.newPassword.length <4 || this.newPassword.length >12){
        this.passwordError = true;
        return;
      } else if(this.gender === ""){
        this.genderError = true;
        return;
      } else if (this.activity === ""){
        this.activityError = true;
        return;
      }

    await axios.post("api/createUser", { // post-komento serverille jos ei client virheitä

      username: this.newUsername, //lähetetään käyttäjätiedot serverille
      password: this.newPassword,
      gender: this.gender,
      activity: this.activity
    }).then((res)=>{  //vastauksen res tullessa:

      if(res.data.data.loggedIn){ // katsotaan onko kirjautunut sisälle (tarkistus server.js:ssä)

        const parsed = JSON.stringify(res.data.data);
        localStorage.setItem('data', parsed); // tallennetaan localstorageen tiedot jotta niitä voi käyttää session ajan muillakin sivuilla

        location.href="/loggedin"; // ohjataan kirjautuessa toiselle sivulle.
      }
      else //tarkistetaan serveriltä tulleet virheet ja ilmoitetaan niistä.
      {
        this.newPassword = "";
        if(res.data.errors.nameError != null)
        {
          this.newUsername = "";
          this.nameErrorText = res.data.errors.nameError;
          this.nameError = true;
        }
        if(res.data.errors.passwordError != null){
          this.passwordErrorText = res.data.errors.passwordError;
          this.passwordError = true;
        }
      }
    }).catch(()=>{
      alert("Error! Try again later.");
    })

    },
    signIn : async function(){

      this.signInNameError = false;       //kaikki virheet ensin pois.
      this.signInPasswordError = false;

      if(this.username.length <4 || this.username.length >12){ // käydään läpi ja ilmoitetaan käyttäjälle client puolen virheistä
        this.signInNameError = true;
        return;
      } else if(this.password.length <4 || this.password.length >12){
        this.signInPasswordError = true;
        return;
      }

      let params = {  //kirjautumistiedot serverille
        username: this.username,
        password: this.password
      }
      await axios.get("api/signIn", {params}).then((res) =>{ // haetaan kirjautumistiedot
        console.log(res.data);
        if(res.data.data.loggedIn){ // jos kirjautumis tiedot löytyvät

          const parsed = JSON.stringify(res.data.data);
          localStorage.setItem('data', parsed); // tallennetaan tiedot muiden sivujen käytettäväksi session ajaksi.

          location.href = '/loggedin'; //siirretään seuraavalle sivulle
        }
        else{ // ilmoitetaan serverin virheistä
          this.signInPasswordError = true;
          this.signInPasswordErrorText = "Invalid username or password!"
          //alert("Invalid username or password!");
          this.username = ""; // tyhjennetään kentät
          this.password = "";
        }

      }).catch((e)=>{
        console.log(e);
        alert("Error! Try again later.");
      });

    }
  },
}
</script>

<style scoped>
.errors{
  color: red;
}
form-group, input{
  margin: 7px;
}

.button-12 {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  background: #494d52;
  color: #DFDEDF;
  font-size: 20px;

}

.button-12:focus {
  outline: 0;
}
</style>