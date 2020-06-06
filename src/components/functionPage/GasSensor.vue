<template>
  <div id="gasSensor" :style="bgphoto2">
    <Headerele  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></Headerele>
    <OpenClose  v-if='JSON.stringify(deviceinfo) !== "{}"'  :deviceinfo="deviceinfo"></OpenClose> 
       <div class="tem_h">
      <div class="tem_hum">
        <div class="somedata">
          温度:
          <input class="temp" type="text" v-model="temperature" />
          <input class="temp2" type="text" v-model="dotimet" />

        </div>
        <div class="somedata">
          湿度:
          <input class="temp" type="text" v-model="humidity" />
          <input class="temp2" type="text" v-model="dotimeh" />
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
import Headerele from "../detailpage/deviceTitle";
import OpenClose from "../detailpage/openClose";
import Bus from "../../bus.js";
import $ from 'jquery';
import Axios from "axios";
import qs from "qs";
import Truedata from "../../utils/async";
export default {
  name: "gasSensor",
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
       temperature: "",
      humidity: "",
      dotimet:"",
      dotimeh:"",
      recordDate: "",
      temp: "",
      hum: "",
      timer: "",
      deviceState:"",
      deviceId:""
    };
  },
   methods: {
  /*   senddata() {
      var userid = this.$store.state.username.userId;
      var cusid = 4;
      var data = {
        userId: userid,
        cusSceneId: cusid,
        temperature: this.temp,
        humidity: this.hum
      };
      Axios({
        method: "POST",
        url: "http://182.92.194.165:8081/humiture/insert",
        data: qs.stringify(data),
        dataType: "json",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => {
          //  console.log(res);
          (this.temp = ""), (this.hum = "");
        })
        .catch(function(err) {
          console.log(err);
        });
    } */
  },
  mounted(){
    this.deviceinfo=this.$route.query.devices;
    this.deviceId = this.deviceinfo.deviceId;
     var userid = this.$store.state.username.userId;
     var msg={};
      msg.userId= userid;
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
               var senddata={};
              senddata.deviceId=this.deviceId;
              Truedata.showdata(senddata,"http://182.92.194.165:8081/operate/device/querytemp").then(res=>{
                var long=res.temperatures.length;
                console.log(res.temperatures);
                 this.dotimet = res.temperatures[long-1].time;
                this.temperature=res.temperatures[long-1].temperature+"℃";
             })
            Truedata.showdata(senddata,"http://182.92.194.165:8081/operate/device/queryhum").then(res=>{
              var long=res.humidities.length;
              console.log(res.humidities);
              this.dotimeh = res.humidities[long-1].time;
              this.humidity=res.humidities[long-1].humidity+"%rh";
            })
          }
       })
        .catch(function(err) {
          console.log(err);
        });
     

        
    Bus.$on("msg", res => {
       this.operation = res.operation;
       if (this.operation == 1 && res.deviceId == this.deviceId) {
        var senddata={};
        senddata.deviceId=this.deviceId;
        Truedata.showdata(senddata,"http://182.92.194.165:8081/operate/device/querytemp").then(res=>{
          var long=res.temperatures.length;
          this.temperature=res.temperatures[long-1].temperature+"℃";
          this.dotimet = res.temperatures[long-1].time;
        })
        Truedata.showdata(senddata,"http://182.92.194.165:8081/operate/device/queryhum").then(res=>{
          var long=res.humidities.length;
          this.humidity=res.humidities[long-1].humidity+"%rh";
          this.dotimeh = res.humidities[long-1].time;

        })
        var that =this;
        that.timer = setInterval(() => {
          var msg={};
          msg.deviceId= this.deviceId;
          Truedata.showdata(msg,"http://182.92.194.165:8081/operate/device/querytemp").then(res=>{
            var long=res.temperatures.length;
            this.temperature=res.temperatures[long-1].temperature+"℃";
           this.dotimet = res.temperatures[long-1].time;

          });
          Truedata.showdata(msg,"http://182.92.194.165:8081/operate/device/queryhum").then(res=>{
            var long=res.humidities.length;
            this.humidity=res.humidities[long-1].humidity+"%rh";
            this.dotimeh = res.humidities[long-1].time;

          })
          if (that.operation == 0 && res.deviceId == that.deviceId) {
            clearInterval(that.timer);
             this.temperature = "℃";
             this.humidity = "%rh";
              this.dotimet ="";
              this.dotimeh ="";
          }
        },2100)
      } 
      else if (this.operation == 0 && res.deviceId == this.deviceId) {
            clearInterval(this.timer);
            this.temperature = "℃";
             this.humidity = "%rh";
               this.dotimet ="";
              this.dotimeh ="";
          }
    });
  },

  beforeDestroy() {
    //清除定时器
    clearInterval(this.timer);
      this.temperature = "℃";
      this.humidity = "%rh";
      this.dotimet ="";
      this.dotimeh ="";
    console.log("beforeDestroy");
  }
};
</script>
<style >
.tem_h {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top:40px;
}
.tem_hum {
  width: 350px;
  height: 150px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.somedata {
  font-size: 1.2rem;
  color: rgb(85, 83, 84);
}
.temp,.temp2 {
  background: none;
  outline: none;
  border: none;
  width: 22%;
  height: 35px;
  outline: none;
  border-radius: 10px;
  font-size: 1.2rem;
  color: rgb(73, 152, 226);
  text-align: center;
}
.temp2{
    width: 62%;
    font-size: 0.9rem;
   color: rgb(102, 0, 80);
}
.date {
  width: 73%;
  text-align: left;
}
/* .send {
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
} */
</style>
