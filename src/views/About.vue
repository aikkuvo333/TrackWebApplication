<template>
  <div class="about">
    <header id="headerImg">
      <div>
        <span style="font-size:90px; color:white">About<br>TRACK</span>
      </div>
    </header>

    <div class="information">
    <div class="aboutText">
    <h2>About TRACK</h2>
    <p>TRACK was created for easy calorie tracking. We will calculate the recommended calorie intake for the day based on your activity level and biological gender. Search for healthy recipes and find suitable workout videos for you.</p>
      <p>For more information please contact us at <br> track@madeup.com <br> 0358-not-real-8493</p>
    </div>

    <div class="creators">
      <h2>Creators</h2>
      <div class="creator">
        <img src="../photos/avatarSilhouette.jpg" alt="profiilin varjokuva">
        <p>Elsa Rajala</p>
      </div>
      <div class="creator">
        <img src="../photos/avatarSilhouette.jpg" alt="profiilin varjokuva">
        <p>Olli Ruuskanen</p>
      </div>
      <div class="creator">
        <img src="../photos/avatarSilhouette.jpg" alt="profiilin varjokuva">
        <p>Aivan Vo</p>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.about {
  height: 100%;
  font-family: "Inconsolata", sans-serif;
}

.information {
  display: flex;
  flex-wrap: nowrap;
}

#headerImg {
  background-position: center;
  background-size: cover;
  background-image: url('../photos/aboutUsPic.jpg');
  min-height: 75%;
}
.aboutText {
  padding: 20px;
  width: 75%;
}

.aboutText p {
  text-align: left;
  padding: 20px;
}

.creators {
  padding:20px;
  width: 25%;
}

.creator {
  font-size: 20px;
}

img {
  width: 20%;
}
</style>