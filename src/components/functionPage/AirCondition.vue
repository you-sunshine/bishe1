<template>
  <div id="airCondiction" :style="bgphoto2">
   <Headerele  v-if='JSON.stringify(deviceinfo) !== "{}"' :deviceinfo="deviceinfo"></Headerele>
   <OpenClose v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></OpenClose>
    <div class="somedata">
      日期：
      <input class="date" type="text" v-model="this.recordDate" />
    </div>
    <div id="airCond">
       <div class="airCond_a" @click="addTem" >+</div>
       <div>温度</div>
       <div class="airCond_a"  @click="reduceTem">-</div>
    </div>
     <div class="tem_t">
      温度显示:
      <input type="text" v-model="temper" />
    </div>
    <div class="tem_c">
      调节温度:
      <input type="text" v-model="changetemper" />
       <div id="boxe2"  @click="change_t">
        <div style="--color: #e91e63"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Headerele from "../detailpage/deviceTitle";
import OpenClose from "../detailpage/openClose";
import Axios from "axios";
import qs from 'qs';
import Utils from '../../utils/utils'
import Bus from "../../bus.js";
import $ from 'jquery';
export default {
  name: "airCondiction",
  components: {
    Headerele,
    OpenClose
  },
  data() {
    return {
      bgphoto2: {
        height: $(window).height() + "px",
        width: $(window).width() + "px",
        backgroundImage: 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
      },
      deviceinfo: {},
      deviceId:"",
      temperature: "",
      recordDate: "",
      operation:"",
      deviceState:"",
      temper:"",
      changetemper:"",
      timer:""
    };
  },
  methods:{
   addTem(){
      var userid = this.$store.state.username.userId;
      var data={
        deviceId: this.deviceId ,
        userId:userid
      };
      Utils.ChangeVloume("http://182.92.194.165:8081/operate/device/updateairadd",data);
   },
   reduceTem(){
       var userid = this.$store.state.username.userId;
       var data={
        deviceId: this.deviceId ,
        userId:userid
      };
      Utils.ChangeVloume("http://182.92.194.165:8081/operate/device/updateairdown",data);
   },
   change_t(){
      var userid = this.$store.state.username.userId;
      var data = {
        deviceId: this.deviceId,
        userId: userid,
        airValue: this.changetemper,
      };
      Utils.ChangeVloume(
        "http://182.92.194.165:8081/operate/device/updateair",
        data
      );
      this.temper = "";
      this.changetemper = "";
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
          this.temper=detail.airValue;
          this.deviceState=detail.deviceState;

          // console.log(that.deviceState);
          if(this.deviceState==1){
              var devicestate={
                devices: this.deviceState,
                deviceId: this.deviceId,
              }
            Bus.$emit('devicestate',devicestate);
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            var d = date.getDate();
            d = d < 10 ? "0" + d : d;
            var h = date.getHours();
            h = h < 10 ? "0" + h : h;
            var minute = date.getMinutes();
            minute = minute < 10 ? "0" + minute : minute;
            var second = date.getSeconds();
            second = second < 10 ? "0" + second : second;
            this.recordDate =
            y + "-" + m + "-" + d + "   时间：" + h + ":" + minute + ":" + second;
          }
          else if(this.deviceState==0){
            this.temper="";
          }
        })
     .catch(function(err) {
          console.log(err);
     });
   var that = this;
   async function showVolume() {
      var data={
       showtemp:""
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
          var detail =res.data.data.detailDates[0];
          data.showtemp=detail.airValue;
          that.deviceState=detail.deviceState;
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
            this.temper = res.showtemp;
          })
          var that = this;
          that.timer = setInterval(() => {
          showVolume().then(res=>{
           this.temper = res.showtemp;
         })
          if (that.operation == 0 && res.deviceId == that.deviceId) {
            clearInterval(that.timer);
            this.temper = "";
          }
        }, 1000);

        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
       var minute = date.getMinutes();
       minute = minute < 10 ? "0" + minute : minute;
       var second = date.getSeconds();
       second = second < 10 ? "0" + second : second;
       this.recordDate =
       y + "-" + m + "-" + d + "   时间：" + h + ":" + minute + ":" + second;
      }
      else if(this.operation == 0){
         this.recordDate ="",
         clearInterval(this.timer);
         this.temper = "";
      } 
     })
},
   beforeDestroy() {
     //清除定时器
       clearInterval(this.timer);
       console.log("beforeDestroy");
   },
       
};
</script>
<style >
.somedata {
  margin-left: 15px;
  font-size: 1.2rem;
  color: grey;
  margin-top: 20px;
}
.somedata:first-child {
  width: 100% !important;
  margin-top: 20px;
}
.temp,
.date {
  width: 25%;
  height: 35px;
  outline: none;
  border: 1px dashed rgb(2, 161, 161);
  border-radius: 10px;
  font-size: 1.2rem;
  color: rgb(248, 124, 86);
  text-align: center;
}
.date {
  width: 73%;
  text-align: left;
  padding-left: 10px;
}
.send {
  position: relative;
  top: -64px;
  left: 200px;
  width: 50px;
  height: 50px;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: none;
  border-left-style: none;
  border-radius: 50%;
  background: rgb(238, 253, 31);
  display: inline-block;
  margin-left: 86px;
  box-shadow: 0 3px 8px 1px rgb(124, 124, 124);
}
.send_data {
  width: 300px;
  height: 50px;
  margin-top: 100px;
  padding-left: 30px;
}
.send_data input {
  width: 70px;
  height: 25px;
  outline: none;
  border: 1px solid grey;
  border-radius: 5px;
  margin-left: 20px;
  padding-left: 10px;
}
#airCond {
  position: absolute;
  top: 175px;
  left: -80px;
  margin-top: 40px;
  margin-left:50%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 1px solid grey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* border-radius: 10px; */

 
}
#airCond  div {
   float: left;
    height: 60px;
    width: 50px;
    text-align: center;
    line-height: 60px;
    margin: auto;
    color: rgb(71, 70, 70);
  }
.airCond_a {
  font-size: 2.3rem;
}

.tem_t,.tem_c {
  width: 100%;
  height: 50px;
  margin-top: 50px;
  padding-left: 50px;
}
.tem_t{
   margin-top: 210px;
}
.tem_t input {
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
.tem_c>input{
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


#boxe2{
  display: inline-block;
  margin-left:30px;
}
#boxe2 div { 
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
  #boxe2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

#boxe2 div {
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

 #boxe2 div {
  --x: 84;
  --y: 75;
  --size: 128;
}
#boxe2 div:hover {
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


#boxe2 div:after {
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

 #boxe2 div:first-child:after,
#boxe2 div:hover:after {
  color: rgba(255, 255, 255, .7);
  -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}
</style>
