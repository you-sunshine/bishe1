<template>
  <div id="smokeSensor" :style="bgphoto2">
 <Headerele  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></Headerele>
 <OpenClose  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></OpenClose>
   <div class="smoke_v">
      烟雾量:
      <input type="text" v-model="smokedata" />
    </div>

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
  name: "smokeSensor",
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
       deviceId:"",
       smokedata:"",
       timer:""
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
          // console.log(res.data.data.detailDates[0]);
          var detail =res.data.data.detailDates[0];
          this.deviceState=detail.deviceState;
          if(this.deviceState==1){
              var devicestate={
                devices: this.deviceState,
                deviceId: this.deviceId,
              }
           Bus.$emit('devicestate',devicestate);
            showSmoke().then(res=>{
            this.smokedata=res.gasValue;
             })
          }
       })
        .catch(function(err) {
          console.log(err);
        });

    var that = this;
    async function showSmoke() {
      var data={
       smoke:""
      }
      var msg={};
      msg.deviceId= that.deviceId;
      await Axios.get(
        "http://182.92.194.165:8081/operate/device/querygas",
        {
          params:  msg
        },
        { contentType: "application/x-www-form-urlencoded; charset=utf-8" }
      ).then(res => {
          data = res.data.data.gases[0];
          })
        .catch(function(err) {
          console.log(err);
        });
           return data
    }
    Bus.$on("msg", res => {
      this.operation = res.operation;
       if (this.operation == 1 && res.deviceId == this.deviceId) {
       showSmoke().then(res=>{
        this.smokedata=res.gasValue;
       })
        var that = this;
        that.timer = setInterval(() => {
          showSmoke().then(res=>{
             this.smokedata=res.gasValue;
          })
          if (that.operation == 0 && res.deviceId == that.deviceId) {
            clearInterval(that.timer);
             this.smokedata="";
          }
        }, 1000);
      } 
      else if (this.operation == 0 && res.deviceId == this.deviceId) {
            clearInterval(this.timer);
            this.smokedata="";
          }
    });
  },
   beforeDestroy() {
     //清除定时器
       clearInterval(this.timer);
       console.log("beforeDestroy");
   },
};
</script>
<style >
.smoke_v {
  width: 100%;
  height: 50px;
  margin-top: 50px;
  padding-left: 50px;
}
.smoke_v input {
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