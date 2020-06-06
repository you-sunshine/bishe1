<template>
  <div id="volume">
    <div class="volume_j" @click="addvoice">+</div>
    <div>音量</div>
    <div class="volume_j" @click="reducevoice">-</div>
  
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import Utils from "../../utils/utils";
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
    addvoice() {
      var userid = this.$store.state.username.userId;
      var data={
        deviceId: this.deviceid ,
        userId:userid
      };
      Utils.ChangeVloume("http://182.92.194.165:8081/operate/device/updateadd",data);
    },
    reducevoice() {
       var userid = this.$store.state.username.userId;
       var data={
        deviceId: this.deviceid ,
        userId:userid
      };
      Utils.ChangeVloume(
        "http://182.92.194.165:8081/operate/device/updatedown",data
      );
    }
  },
  
};
</script>
<style>
#volume {
  margin: 40px 0 0 50px;
  width: 60px;
  height: 180px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
#volume div {
  height: 60px;
  width: 60px;
  text-align: center;
  line-height: 60px;
  margin: auto;
  color: rgb(71, 70, 70);
}
.volume_j {
  font-size: 2.3rem;
}

</style>