<template>
  <div id="airPurify" :style="bgphoto2">
    <Headerele  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></Headerele>
    <OpenAir  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></OpenAir>

  </div>
</template>
<script>
import Headerele from "../detailpage/deviceTitle";
import OpenAir from "../detailpage/openAir";
import $ from 'jquery';
export default {
  name: "airPurify",
  components: {
    Headerele,
    OpenAir
  },
  data() {
    return {
      deviceinfo:{},
      bgphoto2: {
        height: $(window).height() + "px",
        width: $(window).width() + "px",
        backgroundImage: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
      },
      
    };
  },
  mounted(){
    this.deviceinfo=this.$route.query.devices;
    
    
    
  }
};
</script>
<style >
.open{
    width:100%;
    height:60px;
    margin-top:20px;
    
}
.open img{
      position: absolute;
      width:50px;
      height:50px;
      margin-left:50%;
      left:-25px;
    }
</style>
