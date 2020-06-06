<template>
  <div id="openLight">
    <div id="openClose" class="open">
      <i class="el-icon-turn-off op_close" @click="changeImage" style="color:grey"></i>
    </div>
    <div id="light">
      <div>
        白光：
        <i @click="openWhite" class="el-icon-table-lamp deng1" style="color:grey"></i>
      </div>
      <div>
        暖光：
        <i @click="openOrange" class="el-icon-table-lamp deng2" style="color:grey"></i>
      </div>
      <div>
        日光：
        <i @click="openyellow" class="el-icon-table-lamp deng3" style="color:grey"></i>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import $ from 'jquery'
import Utils from "../../utils/utils";
export default {
  name: "openLight",
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
      deviceState:"",
      lampState:""
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
    // console.log(this.deviceId);
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
        this.lampState=res.data.data.detailDates[0].lampState;
        // console.log(res.data.data.detailDates[0]);

        if(this.deviceState==1 &&  this.lampState==1){
            $('.op_close').css("color","red");
            $('.deng1').css("color","blue");
        }else if(this.deviceState==1 &&  this.lampState==2){
           $('.op_close').css("color","red");
            $('.deng2').css("color","orange");
        }else if(this.deviceState==1 &&  this.lampState==3){
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
       if(lLight.style.color.match("grey") && sLight.style.color.match("grey")){
          if (wLight.style.color.match("grey")) {
         element.style.color = "red";
          wLight.style.color = "blue";
         var lamp = {
          lampState: this.lamp1,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.Changelight(lamp);
        }
       }
      } else if (element.style.color.match("red")) {
        element.style.color = "grey";
        wLight.style.color = "grey";
        lLight.style.color = "grey";
        sLight.style.color = "grey";
         var lamp = {
          lampState: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.Changelight(lamp);
      }
      

     
    },
    openWhite() {
       var element = document.querySelector(".op_close");
      var wLight = document.querySelector(".deng1");
      var lLight = document.querySelector(".deng2");
      var sLight = document.querySelector(".deng3");
      var userid = this.$store.state.username.userId;
     if(lLight.style.color.match("grey") && sLight.style.color.match("grey")){
        if (wLight.style.color.match("grey")) {
        wLight.style.color = "blue";
        element.style.color = "red";
        console.log(this.lamp1);
        var lamp = {
          lampState: this.lamp1,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.Changelight(lamp);
      } else if (wLight.style.color.match("blue")) {
        element.style.color = "grey";
        wLight.style.color = "grey";
         var lamp = {
          lampState: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
         };
         Utils.Changelight(lamp);
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
          lampState: this.lamp2,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.Changelight(lamp);
      } else if (lLight.style.color.match("orange")) {
        lLight.style.color = "grey";
        element.style.color = "grey";
         var lamp = {
          lampState: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.Changelight(lamp);
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
           sLight.style.color = "yellow";
        var lamp = {
          lampState: this.lamp3,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.Changelight(lamp);
      } else if (sLight.style.color.match("yellow")) {
        sLight.style.color = "grey";
        element.style.color = "grey";
         var lamp = {
          lampState: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.Changelight(lamp);
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
  margin-top: 20px;
}
.op_close {
  position: absolute;
  margin-left: 50%;
  font-size: 3rem;
  left: -25px;
  /* color:grey; */
}
#light {
  margin-top: 10px;
  padding-left: 30px;
}
#light div {
  height: 100px;
  margin-bottom: 40px;
  line-height: 80px;
}
#light div i {
  width: 10px;
  font-size: 2rem;
  margin-left: 50px;
}
</style>