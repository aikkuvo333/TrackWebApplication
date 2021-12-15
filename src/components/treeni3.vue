<template>
  <div class="row">
    <h2>Leg workouts</h2>
    <div>
    <videoo :video="selectedVideo" />
    <videolista @videoSelect="onVideoSelect" :videos="videos"></videolista>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import videolista from "../components/videolista";
import videoo from "../components/videoo";
const API_KEY = "AIzaSyDnW3O_8IkFXcYEwLbND4Vj5JPCF4_-k18";

export default {
  name: "treeni3",
  components: {
    videolista,
    videoo
  },
  data() {
    return {

      videos: [],
      selectedVideo: null
    };
  },
  created() {
    //hakusana jolla haetaan heti sivun avautuessa
    this.onSearchvideos('leg workout');
  },
  methods: {
    //asettaa videon valituksi
    onVideoSelect(video) {
      this.selectedVideo = video;
    },
    //hakee videon tietyllä hakusanalla
    onSearchvideos(searchTerm) {
      axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: API_KEY,
          type: "video",
          part: "snippet",
          maxResults: 10,
          q: searchTerm
        }
      })
      .then((response) => {
        this.videos = response.data.items;
      })
      .catch(err => { console.log(err); });
    }
  }
};
</script>

<style scoped>
.row {
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}
* {
  box-sizing: border-box;
}

template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}



.board-wrapper > div > h1 { /*headerit*/
  position: relative;
  padding: 1.3rem 0;
  background: white;
  margin-top: 0;
  color: black;

  border-bottom: 14px solid white;
}



</style>