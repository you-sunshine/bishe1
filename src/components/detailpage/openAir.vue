<template>
  <div id="openAir">
    <div id="openClose" class="open">
      <i class="el-icon-turn-off op_close" @click="changeImage" style="color:grey"></i>
    </div>
    <div id="light">
      <div>
        净水：
        <i @click="openWhite" class="el-icon-loading deng1" style="color:grey"></i>
      </div>
      <div>
        加热：
        <i @click="openOrange" class="el-icon-loading deng2" style="color:grey"></i>
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
  name: "openAir",
  props: {
    deviceinfo: Object
  },
  data() {
    return {
      setmsg: {},
      deviceId: "",
      operation: "",
      lamp0:0,
      lamp1: 1,
      lamp2: 2,
      clearState:""
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
        this.clearState=res.data.data.detailDates[0].cleanerStatus;
        console.log(res.data.data.detailDates[0]);

        if(this.deviceState==1 &&  this.clearState==1){
            $('.op_close').css("color","red");
            $('.deng1').css("color","blue");
        }else if(this.deviceState==1 &&  this.clearState==2){
           $('.op_close').css("color","red");
            $('.deng2').css("color","orange");
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
      var userid = this.$store.state.username.userId;
      var cusid = 1;

      if (element.style.color.match("grey")) {
        element.style.color = "red";
       if(lLight.style.color.match("grey")){
          if (wLight.style.color.match("grey")) {
          wLight.style.color = "blue";
          var lamp = {
          cleanerStatus: this.lamp1,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeAir(lamp);
        }
       }
      } else if (element.style.color.match("red")) {
        element.style.color = "grey";
        wLight.style.color = "grey";
        lLight.style.color = "grey";
        var lamp = {
          cleanerStatus: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeAir(lamp);
      }
     
    },
    openWhite() {
      var element = document.querySelector(".op_close");
      var wLight = document.querySelector(".deng1");
      var lLight = document.querySelector(".deng2");
      var userid = this.$store.state.username.userId;
      var cusid = 1;
     if(lLight.style.color.match("grey")){
        if (wLight.style.color.match("grey")) {
        wLight.style.color = "blue";
        element.style.color="red";
        console.log(this.lamp1);
        var lamp = {
          cleanerStatus: this.lamp1,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeAir(lamp);
      } else if (wLight.style.color.match("blue")) {
        element.style.color = "grey";
        wLight.style.color = "grey";
          var lamp = {
          cleanerStatus: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeAir(lamp);
      }
     }
    },
    openOrange() {
     var element = document.querySelector(".op_close");
      var wLight = document.querySelector(".deng1");
      var lLight = document.querySelector(".deng2");
      var userid = this.$store.state.username.userId;
      var cusid = 1;
     if(wLight.style.color.match("grey")){
        if (lLight.style.color.match("grey")) {
        lLight.style.color = "red";
         element.style.color="red";
        var lamp = {
          cleanerStatus: this.lamp2,
          userId:userid,
          deviceId: this.deviceId,
        };
        console.log(lamp);
        Utils.ChangeAir(lamp);
      } else if (lLight.style.color.match("red")) {
        lLight.style.color = "grey";
         element.style.color="grey";
        this.operation = 0;
        var lamp = {
          cleanerStatus: this.lamp0,
          userId:userid,
          deviceId: this.deviceId,
        };
        Utils.ChangeAir(lamp);
      }
     }
    },
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