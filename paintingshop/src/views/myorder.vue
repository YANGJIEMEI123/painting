<template>
<div>
  <tops></tops>
  <div>
    <div v-for="(b,index) in blo" :key="index" class="a">
      <div>{{b.userid}}</div>
      <div>{{b.gid}}</div>
      <div>{{b.number}}</div>
      
    </div>
  </div>
</div>
</template>
<style>
.a {
  width: 40%;
  height: 100px;
  background-color: red;
  display: flex;
  justify-content: center;
}
</style>
<script>
export default {
  data() {
    return {
      blo: []
    };
  },
  created: function() {
    this.axios
      .post("/getmyorder")
      .then((response)=>{
        this.blo = response.data;
        console.log(this.blo);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>


