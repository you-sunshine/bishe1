<template>
  <div id="openCurtain">
    <div  class="open">
      <i class="el-icon-turn-off op_close" @click="changeImage" style="color:grey"></i>
    </div>
    <div id="curtain">
      <div>
        遮光模式：
        <i @click="openWhite" class="el-icon-cloudy deng1" style="color:grey"></i>
      </div>
      <div>
        防紫外线：
        <i @click="openOrange" class="el-icon-sunny deng2" style="color:grey"></i>
      </div>
      <div>
        隔音模式：
        <i @click="openyellow" class="el-icon-close-notification deng3" style="color:grey"></i>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import $ from "jquery";
import qs from "qs";
import Utils from "../../utils/utils";
import Bus from "../../bus.js";

export default {
  name: "openCurtain",
  props: {
    deviceinfo: Object
  },
  data() {
    return {
      setmsg: {},
      deviceId: "",
      operation: "",
      lamp0: 0,
      lamp1: 1,
      lamp2: 2,
      lamp3: 3,
      curtainState:"",

    };
  },
  watch: {
    deviceinfo: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.$nextTick(() => {
          this.deviceinfo = newVal;
          //在下面进行一些赋值操作等
          this.data = newVal.artificialCostList
            ? newVal.artificialCostList
            : "";
        });
      }
    }
  },
  mounted() {
    this.setmsg = this.$parent.deviceinfo;
    this.deviceId = this.setmsg.deviceId;
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
      ).then(res=>{
        this.deviceState=res.data.data.detailDates[0].deviceState;
        this.curtainState=res.data.data.detailDates[0].curtainStatus;
        // console.log(res.data.data.detailDates[0]);

        if(this.deviceState==1 &&  this.curtainState==1){
            $('.op_close').css("color","red");
            $('.deng1').css("color","blue");
        }else if(this.deviceState==1 &&  this.curtainState==2){
           $('.op_close').css("color","red");
            $('.deng2').css("color","orange");
        }else if(this.deviceState==1 &&  this.curtainState==3){
           $('.op_close').css("color","red");
            $('.deng3').css("color","yellow");
        }
        else if(this.deviceState==0){
           $('.op_close').css("color","grey")
        }
        
      })
 },
  methods: {
    changeImage() {
      var element = document.querySelector(".op_close");
      var wLight = document.querySelector(".deng1");
      var lLight = document.querySelector(".deng2");
      var sLight = document.querySelector(".deng3");
      var userid = this.$store.state.username.userId;
      if (element.style.color.match("grey")) {
        element.style.color = "red";
       if(lLight.style.color.match("grey") && lLight.style.color.match("grey")){
          if (wLight.style.color.match("grey")) {
          wLight.style.color = "blue";
          var lamp = {
          curtainStatus: this.lamp1,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeCurtain(lamp);
        }
       }
      } else if (element.style.color.match("red")) {
        element.style.color = "grey";
        wLight.style.color = "grey";
        lLight.style.color = "grey";
        sLight.style.color = "grey";
       var lamp = {
          curtainStatus: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeCurtain(lamp);
      }
      

     
    },
    openWhite() {
      var element = document.querySelector(".op_close");
      var wLight = document.querySelector(".deng1");
      var lLight = document.querySelector(".deng2");
      var SLight = document.querySelector(".deng3");
      var userid = this.$store.state.username.userId;
      var cusid = 1;
     if(lLight.style.color.match("grey") && SLight.style.color.match("grey")){
        if (wLight.style.color.match("grey")) {
        wLight.style.color = "blue";
        element.style.color = "red";
        console.log(this.lamp1);
        var lamp = {
          curtainStatus: this.lamp1,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeCurtain(lamp);
      } else if (wLight.style.color.match("blue")) {
        element.style.color = "grey";
        wLight.style.color = "grey";
        var lamp = {
          curtainStatus: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeCurtain(lamp);
      }
     }
    },
    openOrange() {
      var element = document.querySelector(".op_close");
      var wLight = document.querySelector(".deng1");
      var lLight = document.querySelector(".deng2");
      var sLight = document.querySelector(".deng3");
      var userid = this.$store.state.username.userId;
      var cusid = 1;
     if(wLight.style.color.match("grey") && sLight.style.color.match("grey")){
        if (lLight.style.color.match("grey")) {
        lLight.style.color = "orange";
        element.style.color = "red";
        var lamp = {
          curtainStatus: this.lamp2,
          userId:userid,
          deviceId: this.deviceId,
        };
        console.log(lamp);
        Utils.ChangeCurtain(lamp);
      } else if (lLight.style.color.match("orange")) {
        lLight.style.color = "grey";
        element.style.color = "grey";
        var lamp = {
          curtainStatus: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeCurtain(lamp);
      }
     }
    },
    openyellow() {
      var element = document.querySelector(".op_close");
      var wLight = document.querySelector(".deng1");
      var lLight = document.querySelector(".deng2");
      var sLight = document.querySelector(".deng3");
      var userid = this.$store.state.username.userId;
      var cusid = 1;
     if(wLight.style.color.match("grey") && lLight.style.color.match("grey")){
        if (sLight.style.color.match("grey")) {
        element.style.color = "red";
        sLight.style.color = "red";
        var lamp = {
          curtainStatus: this.lamp3,
          userId:userid,
          deviceId: this.deviceId,
        };
        console.log(lamp);
        Utils.ChangeCurtain(lamp);
      } else if (sLight.style.color.match("red")) {
        sLight.style.color = "grey";
        element.style.color = "grey";
        var lamp = {
          curtainStatus: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeCurtain(lamp);
      }
     }
    }
  }
};
</script>
<style >
.open {
  width: 100%;
  height: 60px;
  /* margin-top: 70px; */
}
.op_close {
  position: absolute;
  margin-left: 50%;
  font-size: 3rem;
  left: -25px;
  /* color:grey; */
}
#curtain {
  margin-top: 10px;
  padding-left: 30px;
}
#curtain div {
  height: 100px;
  margin-bottom: 40px;
  line-height: 80px;
}
#curtain div i {
  width: 10px;
  font-size: 2rem;
  margin-left: 50px;
}
</style>