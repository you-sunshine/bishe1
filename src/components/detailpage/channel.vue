<template>
  <div id="channel">
    <div class="channel_j"  @click="addchannel">+</div>
    <div>频道</div>
    <div class="channel_j"  @click="reducechannel">-</div>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import Utils from "../../utils/utils";
import Bus from '../../bus.js'

export default {
  name: "volume",
   props: {
    deviceinfo: Object
  },
  data() {
    return {
      setmsg: "",
      deviceid: "",
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
  mounted(){
    this.setmsg = this.$parent.deviceinfo;
    this.deviceid = this.setmsg.deviceId;
  },
  methods: {
    addchannel() {
      var userid = this.$store.state.username.userId;
      var data={
        deviceId: this.deviceid ,
        userId:userid
      };
      Utils.ChangeVloume("http://182.92.194.165:8081/operate/device/updateproadd",data);
    },
    reducechannel() {
       var userid = this.$store.state.username.userId;
       var data={
        deviceId: this.deviceid ,
        userId:userid
      };
      Utils.ChangeVloume("http://182.92.194.165:8081/operate/device/updateprodown",data);
    }
  },
};
</script>
<style >
#channel {
  position: absolute;
  top: 135px;
  right: 50px;
  margin-top: 40px;
  width: 60px;
  height: 180px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

 
}
#channel  div {
    height: 60px;
    width: 60px;
    text-align: center;
    line-height: 60px;
    margin: auto;
    color: rgb(71, 70, 70);
  }
.channel_j {
  font-size: 2.3rem;
}
</style>