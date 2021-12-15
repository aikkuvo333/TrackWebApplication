<template>
  <div class="search-wrapper">
    <p id="nimi">Hello {{userData.username}}!</p>

    <div id="donut">
      <vc-donut :sections="sections" :size="280">{{caloriesSum + ' kcal'}}<br>/{{calories + ' kcal'}}</vc-donut>
      <input id="date" type="date" v-model="myDate"  v-on:input="teeHaku">
      <ul>
        <li v-for="food of foods" :key="food" >{{food.foodname}}: {{food.calories}} kcal</li>
      </ul>
    </div>

    <div class="search-results-and-show-calories">
    <div class="dropdown">
      <input  v-if="Object.keys(selectedItem).length === 0" ref="dropdowninput"  v-model.trim="item" class="dropdown-input"  type="text" placeholder="Search food.." v-on:keyup="getlista" />
      <div v-else @click="resetSelection" class="dropdown-selected">
        {{ selectedItem.name }}
      </div>
      <div v-show="item" class="dropdown-list">
        <div v-for="result in search.results" :key="result"  @click="selectItem(result)" class="dropdown-item">
          {{ result.name }}
        </div>
      </div>
      <br>
      <input v-model="maara" type="number" placeholder="Amount in grams.." class="dropdown-input"/>
      <button v-on:click="ShowIngredient" class="button-12">Search</button>
    </div>

    <div class="search-results">
      <ul>
        <li>Product: {{ name}}</li>
        <li id="maara">Amount: {{paino}}</li>
        <li>Calories: {{kalori }}</li>
      </ul>
      <button v-on:click="haejanayta" class="button-12">Save</button>
    </div>
    </div>
  </div>
</template>

<script>
import getIngredientInfo from '../services/RecipeService';
import getIngredientId from '../services/RecipeService';
import axios from 'axios';
export default {
name: "HomeLoggedIn",
  data(){
    return{
      ingredientInfo:[],
      search:[],
      paino: null,
      kalori:null,
      name:null,
      kaloriIlmanYksikkoa:null,
      paivays: null,
      userData:[],
      ingredient:null,
      date:null,
      foods:[],
      myDate : new Date().toISOString().slice(0,10),
      calories:null,
      caloriesSum:0,
      donutChartCalories:0,
      sections: [{ value: 0, color: 'red' }],
      searchresults:[],
      item:null,
      maara: null,
      selectedItem: {},
    }
  },
  mounted() {
  //hakee userdata taulukkoon tällä hetkellä kirjautuneen käyttäjän tiedot ja laskee kaloritavoitteen
    if (localStorage.getItem('data')) {
      try {
        this.userData = JSON.parse(localStorage.getItem('data'));
        this.teeHaku();

        //kaloritavoitteen lasku
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
  props:["id"],
  methods: {
    /*Näyttää käyttäjän hakeman ruoka-aineen tiedot*/
    ShowIngredient: function() {
      let product = this.selectedItem;
      let maara = this.maara;

      //hakee ruoka-aineen tiedot
      getIngredientId.getIngredientId(product.id).then(res => {
        //haetaan id
        this.search = res.data //vastauksena haettu id
        console.log('GET SEARCH DATA ', this.search)
        console.log(this.search.results);

        getIngredientInfo.getIngredientInfo(this.selectedItem.id).then(res => { //haetaan id:llä määritellyn ainesosan tarkemmat tiedot
          this.ingredientInfo = res.data; //tallennetaan saatu data taulukkoon
          console.log('GET INGREDIENT DETAIL ', this.ingredientInfo)

          //haetaan tuotenimi, annosmäärä grammoina ja sen kalorit:
          this.name = this.ingredientInfo.originalName;
          this.paino=this.ingredientInfo.nutrition.weightPerServing.amount;
          this.kalori = this.ingredientInfo.nutrition.nutrients[this.ingredientInfo.nutrition.nutrients.findIndex(x => x.title ==="Calories")].amount;

          let originalKclPerGram = this.kalori/this.paino; //lasketaan kalori/g

          let laskettuKaloriMaara = maara * originalKclPerGram; //kerrotaan käyttäjän syöttämällä painomäärällä
          this.paino=maara + this.ingredientInfo.nutrition.weightPerServing.unit ;
          this.kalori = Math.round(laskettuKaloriMaara)+ this.ingredientInfo.nutrition.nutrients[this.ingredientInfo.nutrition.nutrients.findIndex(x => x.title ==="Calories")].unit;
          this.kaloriIlmanYksikkoa = laskettuKaloriMaara; //tarvitaan saveIngredient metodissa
        })
      })
    },
    /*Tallentaa ruoka-aineen tietokantaan*/
    saveIngredient:function() {
      this.ingredient = this.name + " " + this.kalori;
      if (this.name !== null && this.kaloriIlmanYksikkoa > 0) {
        console.log('saved');

        //päivämäärä mysql hyväksymään muotoon
        let dat = new Date();
        let y = dat.getFullYear();
        let m = dat.getMonth() + 1;
        let d = dat.getDate();
        let date = y + '-' + m + '-' + d;

        let kal = Math.round(this.kaloriIlmanYksikkoa); //pyöristetään laskettu kaloriarvo lähimpään integeriin

        axios.post("api/addFood", {
          username: this.userData.username,
          calories: kal,
          foodname: this.name,
          date: date
        }).then((res) => {
          console.log(res);
        }).catch(() => {
          alert("Error! Try again later.");
        })
      }
    },
    /*Hakee ruoan tietokannasta käyttäjänimen ja päivämäärän perusteella.*/
    teeHaku: async function() {
      let params = {
        username: this.userData.username,
        date:this.myDate
      }
      await axios.get("api/getFood", {params}).then((res) =>{
        this.foods=res.data;
        console.log(this.foods);
      }).catch((e)=>{
        console.log(e);
        alert("Error! Try again later.");
      });
      this.laskeKaloriSumma();
    },
    /*kutsutaan tallenna-nappia painettaessa, tallentaa tuotteen tietokantaan ja hakee sen näytille kalenterin alle*/
    haejanayta: function(){
      this.saveIngredient();
      this.teeHaku();
    },
    /*kutsutaan klikattaessa text-inputtia, antaa listan hakutuloksia dropdownille*/
    getlista: function(){
      let product = this.item;
      getIngredientId.getIngredientId(product).then(res => {
        this.search = res.data
      })
    },
    /*Kutsutaan klikattaessa dropdownlistassa tuotetta, tuotteesta tulee selecteditem. this.item asetetaan tyhjäksi jotta dropdownlist menee piiloon*/
    selectItem (theItem) {
      this.selectedItem = theItem
      this.item = ''
      this.$emit('on-item-selected', theItem)
    },
    /*Kutsutaan klikattaessa dropdown-inputtia, selecteditem asetetaan tyhjäksi*/
    resetSelection () {
      this.selectedItem = {}
      this.$nextTick( () => this.$refs.dropdowninput.focus() )
      this.$emit('on-item-reset')
    },
    /*Laskee valitun päivän kalorisumman*/
    laskeKaloriSumma: function() {
      this.caloriesSum = 0;
      for (let i=0; i<this.foods.length; i++) {
        this.caloriesSum += this.foods[i].calories;
      }

      this.donutChartCalories = (this.caloriesSum/this.calories)*100; //laskutoimitus doughnut chartin väritetylle alueelle
      if (this.donutChartCalories <= 100) {
        this.sections[0].value = this.donutChartCalories;
      } else {
        this.sections[0].value = 100;
      }
    }
  }
}
</script>

<style scoped>
#nimi{
  font-size: 40px;
  padding-top: 20px;
}

.dropdown{
  display: flex;
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.dropdown-input, .dropdown-selected{
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #edf2f7;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
  margin: 3px;
  max-width: 400px;
}

.dropdown-input:focus, .dropdown-selected:hover{
  background: #fff;
  border-color: #e2e8f0;
}

.dropdown-input::placeholder{
  opacity: 0.7;
}

.dropdown-list{
  position: absolute;
  width: 100%;
  max-width: 250px;
  max-height: 400px;
  margin-top: 40px;
  margin-left:7px ;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.dropdown-item{
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}

.dropdown-item:hover{
  background: #edf2f7;
}

.search-results{
  margin: 20px;
  padding: 20px;
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

#donut {
  float: left;
  width: 40%;
  padding: 20px;
}

.search-results-and-show-calories {
  display: block;
  float: left;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  margin-top: 50px;
}

ul {
  list-style-type: none;
}

#date{
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #edf2f7;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
  margin: 20px;
  max-width: 400px;
}

@media screen and (max-width: 900px) {
  #donut{
    width: 100%;
  }
  .search-results-and-show-calories{
    width: 100%;
  }
  .dropdown-list{
    max-width: 180px;
  }
}

</style>