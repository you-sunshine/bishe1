<template>
  <div id="windows"  :style="bgphoto2">
      <Headerele  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></Headerele>
      <OpenClose  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></OpenClose>
  </div>
</template>
<script>
import Headerele from "../detailpage/deviceTitle";
import OpenClose from "../detailpage/openClose";
import $ from 'jquery';
import qs from 'qs';
import Utils from '../../utils/utils'
import Bus from "../../bus.js";
import  Axios from 'axios';
export default {
  name: "windows",
  components: {
    Headerele,
    OpenClose
  },
  data() {
    return {
      deviceinfo:{},
       bgphoto2: {
        height: $(window).height() + "px",
        width: $(window).width() + "px",
        backgroundImage: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
      },
      deviceState:"",
      deviceId:""
    };
  },
  mounted(){
    this.deviceinfo=this.$route.query.devices;
     this.deviceId = this.deviceinfo.deviceId;
     var userid = this.$store.state.username.userId;
     var msg={};
     msg.userId=userid;
     msg.deviceId= this.deviceId;
     Axios.get(
        "http://182.92.194.165:8081/operate/device/querydatevalue",
        {
          params:  msg
        },
        { contentType: "application/x-www-form-urlencoded; charset=utf-8" }
      ).then(res => {
          console.log(res.data.data.detailDates[0]);
          var detail =res.data.data.detailDates[0];
          this.deviceState=detail.deviceState;
          if(this.deviceState==1){
              var devicestate={
                devices: this.deviceState,
                deviceId: this.deviceId,
              }
           Bus.$emit('devicestate',devicestate);
          }
          })
        .catch(function(err) {
          console.log(err);
        });
  }
};
</script>
<style >
</style>