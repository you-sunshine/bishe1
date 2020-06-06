<template>
<div id='contentele'>
    <router-view></router-view>
    <Footer></Footer>
</div>
</template>
<script>
import Footer from "./footer";
export default {
 name: 'contentele',
 components:{
   Footer
 },
 data () {
  return {
}
}
}
</script>
<style >

</style>