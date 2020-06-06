<template>
  <div id="openClose" class="open">
    <i class="el-icon-turn-off op_close" @click="changeImage" style="color:grey"></i>
  </div>
</template>
<script>
import $ from "jquery";
import qs from "qs";
import Utils from "../../utils/utils";
import Bus from '../../bus.js'
export default {
  name: "openClose",
  props: {
    deviceinfo: Object
  },
  data() {
    return {
      setmsg: "",
      deviceid: "",
      operation: ""
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
    this.deviceid = this.setmsg.deviceId;
     Bus.$on("devicestate", res => {
       if(res.devices==1){
           $('.op_close').css("color","red");
       }
       
     })
  },
   beforeDestroy() {
     //清除定时器
       clearInterval(this.timer);
       console.log("beforeDestroy");
   },
  methods: {
    changeImage() {
      var element = document.querySelector(".op_close");
      var userid = this.$store.state.username.userId;
      var cusid = 1;
      if (element.style.color.match("grey")) {
        element.style.color = "red";
        this.operation = 1;
        var data = {
          userId: userid,
          cusId: 1,
          deviceId: this.deviceid,
          operation: this.operation
        };
        Utils.Openlight(data);
        var msg={
          deviceId: this.deviceid,
          operation: this.operation
        }
        Bus.$emit('msg',msg)
      }
      else if(element.style.color.match("red")){
        element.style.color = "grey";
        this.operation = 0;
        var data = {
          userId: userid,
          cusId:1,
          deviceId: this.deviceid,
          operation: this.operation
        };
        var msg={
          deviceId: this.deviceid,
          operation: this.operation
        }
        Utils.Openlight(data);
        Bus.$emit('msg',msg)
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
.open i {
  position: absolute;
  margin-left: 50%;
  left: -25px;
  font-size: 3rem;
}
</style>