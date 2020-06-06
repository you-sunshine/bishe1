<template>
  <div id="song"  :style="bgphoto2">
    <Headerele v-if='JSON.stringify(deviceinfo) !== "{}"' :deviceinfo="deviceinfo"></Headerele>
    <OpenClose v-if='JSON.stringify(deviceinfo) !== "{}"' :deviceinfo="deviceinfo"></OpenClose>
    <Volume v-if='JSON.stringify(deviceinfo) !== "{}"' :deviceinfo="deviceinfo"></Volume>
    <Channel v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></Channel>
    <div class="view_v">
      音量显示:
      <input type="text" v-model="volume" />
    </div>
    <div class="view_c">
      调换曲目:
      <input type="text" v-model="channel" />
      <div id="boxe1"  @click="change_c">
        <div style="--color: #e91e63"></div>
      </div>
     
    </div>
    <div class="view_v">
      节目显示:
    <input type="text" v-model="showchannel" />
  </div>
  </div>
</template>
<script>
var boxes = document.querySelectorAll('#boxe1 > div');
  [].forEach.call(boxes, box => {
    box.addEventListener('mousemove', e => {
      document.body.style.setProperty(
        '--bg-color',
        box.style.getPropertyValue('--color')
      );

      var size = parseInt(getComputedStyle(box).width);
      
      // scaling
      var x = size * .3 * .7 + .7 * e.offsetX;
      var y = size * .3 * .7 + .7 * e.offsetY;
      
      box.style.setProperty('--x', x);
      box.style.setProperty('--y', y);
      box.style.setProperty('--size', size);
    });
  });
  </script>
<script>
import Headerele from "../detailpage/deviceTitle";
import OpenClose from "../detailpage/openClose";
import Volume from "../detailpage/volume";
import Channel from "../detailpage/channel";
import Axios from "axios";
import qs from "qs";
import Utils from '../../utils/utils'
import Bus from "../../bus.js";
import showvolume from "../../utils/async";
import $ from 'jquery';
export default {
  name: "song",
  components: {
    Headerele,
    OpenClose,
    Volume,
    Channel
  },
  data() {
    return {
      deviceinfo: {},
      volume: "",
      operation: "",
      channel:"",
      showchannel:"",
      deviceId:"",
      timer:"",
      deviceState:"",
       bgphoto2: {
        height: $(window).height() + "px",
        width: $(window).width() + "px",
        backgroundImage: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
      },
    };
  },
  methods:{
     change_c(){
      console.log(this.deviceinfo.deviceId);
      var deviceid=this.deviceinfo.deviceId;
      var userid = this.$store.state.username.userId;
      var data={
        programValue:this.channel,
        deviceId:deviceid,
        userId:userid
      }
       Utils.ChangeVloume(
        "http://182.92.194.165:8081/operate/device/updatepro",data
      );
      this.channel="";
     }
 
 
  },
  mounted() {
    this.deviceinfo = this.$route.query.devices;
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
              showVolume().then(res=>{
                this.volume = res.volume;
                this.showchannel = res.showchannel
              })
              var that=this;
              /* that.timer=setInterval(()=>{
                showVolume().then(res=>{
                this.volume = res.volume;
                this.showchannel = res.showchannel
              })
              }) */
                   
          }
          })
        .catch(function(err) {
          console.log(err);
        });
     var that = this;
    async function showVolume() {
    var data={
       volume:"",
       showchannel:""
     }
     var msg={};
     msg.userId=userid;
     msg.deviceId= that.deviceId;

     await Axios.get(
        "http://182.92.194.165:8081/operate/device/querydatevalue",
        {
          params:  msg
        },
        { contentType: "application/x-www-form-urlencoded; charset=utf-8" }
      ).then(res => {
          console.log(res.data.data.detailDates[0]);
          var detail =res.data.data.detailDates[0];
          data.volume=detail.dateValue;
          data.showchannel=detail.programValue;
          that.deviceState=detail.deviceState;
          // console.log(that.deviceState);
          if(that.deviceState==1){
              var devicestate={
          devices: that.deviceState,
          deviceId: that.deviceId,
        }
           Bus.$emit('devicestate',devicestate)
          }
          
          })
        .catch(function(err) {
          console.log(err);
        });
          return data
    }
     
    Bus.$on("msg", res => {
       this.operation = res.operation
      if (this.operation == 1 && res.deviceId == this.deviceId) {
       showVolume().then(res=>{
          this.volume = res.volume;
          this.showchannel = res.showchannel
       })
        var that = this;
        that.timer = setInterval(() => {
          showVolume().then(res=>{
          this.volume = res.volume;
          this.showchannel = res.showchannel
       })
          if (that.operation == 0 && res.deviceId == that.deviceId) {
            clearInterval(that.timer);
            that.volume = "";
            that.showchannel = "";
          }
        }, 1000);
      } 
      else if(this.operation == 0 && res.deviceId == this.deviceId){
          clearInterval(this.timer);
            this.volume = "";
            this.showchannel = "";
      }
    });
     
  },
    beforeDestroy() {
     //清除定时器
       clearInterval(this.timer);
         this.volume = "";
         this.showchannel="";
       console.log("beforeDestroy");
   },
        
};
</script>
<style >
.view_v,.view_c {
  width: 100%;
  height: 50px;
  margin-top: 50px;
  padding-left: 50px;
}
.view_v input {
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
.view_c>input{
   display: inline-block;
  margin-left: 20px;
  width: 60px;
  height: 25px;
  background:none;  
	outline:none;  
	border:1px solid rgb(155, 128, 144);
  border-radius: 7px;
  padding-left: 10px;
}
#boxe1{
  display: inline-block;
  margin-left:30px;
}
#boxe1 div { 
  display: -webkit-box; 
  display: -ms-flexbox; 
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center; 
  -webkit-box-pack: center; 
      -ms-flex-pack: center; 
          justify-content: center;
}


@media (max-width: 320px) {
  #boxe1 {
    grid-template-columns: repeat(2, 1fr);
  }
}

#boxe1 div {
  counter-increment: number;
  width:40px;
  height: 40px;
  min-width: 40px;
  min-height:40px;
  -webkit-transition: .5s all ease;
  transition: .5s all ease;
  background: var(--color, #aaa);
  border: 0 solid transparent;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border-radius: 50%;
  margin: .5em;
  opacity: .8;
  --dx: calc(var(--size) - var(--x));
  --dy: calc(var(--size) - var(--y));
}

 #boxe1 div {
  --x: 84;
  --y: 75;
  --size: 128;
}
#boxe1 div:hover {
  opacity: 1;
  cursor: pointer;
  border: calc(2px + .85vw) solid rgba(255, 255, 255, .5);
  -webkit-transition:
    .5s background-color ease,
    .2s border ease;
  transition:
    .5s background-color ease,
    .2s border ease;

  border-radius:
    calc(var(--x) / var(--size) * 100%) 
    calc(var(--dx) / var(--size) * 100%)
    calc(var(--dx) / var(--size) * 100%) 
    calc(var(--x) / var(--size) * 100%) / 
    calc(var(--y) / var(--size) * 100%) 
    calc(var(--y) / var(--size) * 100%) 
    calc(var(--dy) / var(--size) * 100%) 
    calc(var(--dy) / var(--size) * 100%) 
}


#boxe1 div:after {
  content:"OK";
  color: rgba(255, 255, 255, 0);
  font-size: calc(0.3vw + 0.7em);
  font-weight: 200;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  -webkit-transition-delay: .1s;
          transition-delay: .1s;
  -webkit-transform: translate3d(0, -.5em, 0);
          transform: translate3d(0, -.5em, 0);
}

 #boxe1 div:first-child:after,
#boxe1 div:hover:after {
  color: rgba(255, 255, 255, .7);
  -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}
</style>