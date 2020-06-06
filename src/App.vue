<template>
  <div id="app">
     <router-view v-if="isRouterAlive"/>  
  </div>
</template>

<script>
export default {
  name: "app",
  provide(){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
       isRouterAlive: true
    };
  },
 mounted(){
  //  localStorage.removeItem('states')
  
    window.addEventListener("unload", this.saveState);
 },
  
  methods: {
    saveState() {
      localStorage.setItem("states", JSON.stringify(this.$store.state));
    },
    reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   }  
  }
};
</script>

<style >


</style>
