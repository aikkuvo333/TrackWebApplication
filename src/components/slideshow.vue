<template>
  <div>
    <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="2000"
        fade
        controls
        indicators
        background="#000000"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"

    >
      <b-carousel-slide>
        <template #img>
          <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="../photos/pic1.jpeg"
              alt="image slot"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide>
        <template #img>
          <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="../photos/pic2.jpeg"
              alt="image slot"
          >
        </template>
      </b-carousel-slide><b-carousel-slide>
      <template #img>
        <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="../photos/pic3.jpeg"
            alt="image slot"
        >
      </template>
    </b-carousel-slide>

    </b-carousel>

  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 0

    }
  }
}
</script>
<style scoped>

</style>