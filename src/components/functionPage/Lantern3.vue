<template>
  <div id="lantern3" :style="bgphoto2">
    <Headerele  v-if='JSON.stringify(deviceinfo) !== "{}"' :deviceinfo="deviceinfo"></Headerele>
     <OpenLight v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></OpenLight>
  </div>
</template>
<script>
import Headerele from "../detailpage/deviceTitle";
import OpenLight from "../detailpage/OpenLight";
import $ from 'jquery';
export default {
  name: "lantern3",
  components: {
    Headerele,
    OpenLight
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
    // console.log(this.$route.query.devices);
    // console.log(this.deviceinfo.label1);
    
    
    
  }
};
</script>
<style >
</style>
