<template>
  <b-container fluid class="bv-example-row">
    <b-row>
      <b-col class="treeni">

         <treeni1></treeni1>
      </b-col>
      <b-col class="treeni">
        <treeni2></treeni2>
      </b-col>
      <b-col class="treeni">

        <treeni3></treeni3>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import treeni1 from "../components/treeni1"
import treeni2 from "../components/treeni2"
import treeni3 from '../components/treeni3';
export default {
  name: "treeni",
  components: {
    treeni1,
    treeni2,
    treeni3
  }
}
</script>

<style scoped>
.container{
  margin-top: 40px;
  display: flex;
}

.treeni{
  padding:5px;
  margin: 5px;
}
</style>