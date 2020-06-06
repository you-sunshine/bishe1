<template>
  <div id="eleCurtain" :style="bgphoto2">
    <Headerele  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></Headerele>
   
   <OpenCurtain  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></OpenCurtain>
  </div>
</template>
<script>
import Headerele from "../detailpage/deviceTitle";
import OpenCurtain from "../detailpage/openCurtain";
import $ from 'jquery';
import Axios from "axios";
import Truedata from "../../utils/async";
import Bus from "../../bus.js";
export default {
  name: "eleCurtain",
  components: {
    Headerele,
    OpenCurtain
  },
  data() {
    return {
        deviceinfo:{},
        light:"",
        deviceId: "",
        deviceState:"",
        timer: "",
        bgphoto2: {
        height: $(window).height() + "px",
        width: $(window).width() + "px",
        backgroundImage: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
      },
      
    };
  },
  mounted(){
    this.deviceinfo=this.$route.query.devices;
     this.deviceId = this.deviceinfo.deviceId;
     var msg={};
     msg.deviceId= this.deviceId;
    var that =this;
    /* Truedata.showdata(msg,"http://182.92.194.165:8081/operate/device/querylight").then(res=>{
      this.light=res.lightValue;
    })
    that.timer = setInterval(() => {
        var msg={};
         msg.deviceId= this.deviceId;
        Truedata.showdata(msg,"http://182.92.194.165:8081/operate/device/querylight").then(res=>{
         this.light=res.lights[0].lightValue;
         if(this.light>=18){   //光照值大于18，关闭窗帘，处于遮光模式
           var maxlight = 1;
             Bus.$emit("opencolse",maxlight)
         }
        else if(this.light<18){
           var minlight = 0;
             Bus.$emit("opencolse",minlight)
         }
      })
    },1000) */
  },
  /*  beforeDestroy() {
     //清除定时器
       clearInterval(this.timer);
   }, */
       
};
</script>
<style >
.light_s{
  width: 100%;
  height: 50px;
  margin-top: 30px;
  padding-left: 26px;
}
.light_s input {
  display: inline-block;
  margin-left: 20px;
  font-size:1.1rem;
  color:rgb(112, 0, 204);
  width: 60px;
  height: 25px;
  outline: none;
  padding-left: 10px;
  background:none;  
	outline:none;  
	border:none;
}
</style>
