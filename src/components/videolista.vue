<template>
  <div>
  <ul class="list-group col-md-4">
    <videolistitem
        v-for="video in videos"
        :video="video"
        :key="video.etag"
        @videoSelect="onVideoSelect"
    >
    </videolistitem>
  </ul>


  </div>
</template>

<script>
import videolistitem from "./videolistitem";
export default {
  name: "videolista",
  components: {
    videolistitem
  },
  props: ["videos"],
  methods: {
    onVideoSelect(video) {
      this.$emit("videoSelect", video);
    }
  }
};
</script>

<style></style>