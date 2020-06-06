<template>
  <div id="devicetitle">
    <div class="d_title">
      <i class="el-icon-arrow-left" @click="returnhome"></i>
      <span class="set_name">{{deviceinfo.deviceChName}}</span>
      <i class="el-icon-more" @click="showdelect"></i>
    </div>
    <div class="delect" @click="delectDevice">
      删除设备
      <!-- <span class="cancel">X</span> -->
    </div>
    <div class="open">
      <img src alt />
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Axios from "axios";
import qs from "qs";
export default {
  name: "app",
  props: {
    deviceinfo: Object
  },
  data() {
    return {
      devices: {},
      setmsg: {},
      deviceId: ""
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
  },
  methods: {
    returnhome() {
      history.go(-1);
    },
    showdelect() {
      $(".delect").css("display", "block");
    },
    delectDevice() {
      var userId = this.$store.state.username.userId;
      var data = {};
      data.userId = userId;
      data.deviceId = this.deviceId;
      console.log(data);

      if (!confirm("确认要删除？")) {
        window.event.returnValue = false;
      } else {
        Axios({
          method: "POST",
          url:
            "http://182.92.194.165:8081/operate/customization/cusscenedelete",
          data: qs.stringify(data),
          dataType: "json",
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(res => {
            // if (res.data.code == 200) {
            this.$router.push({
              path: "index"
            });
            // } else {
            // alert("error");
            // }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style >
#devicetitle {
  position: relative;
  width: 100%;
  height: 55px;
}
.d_title {
  width: 100%;
  height: 55px;
  background-image: linear-gradient(to right, #bdc2e8d8 0%, #bdc2e8 1%, #e6dee9 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
}
.d_title i {
  font-size: 2rem;
  align-items: center;
  padding: 0 10px;
}
.d_title span {
  display: inline-block;
  flex: 1;
  padding-left: 20px;
}
.delect {
  display: none;
  position: absolute;
  top: 55px;
  right: 0;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 0.9rem;
  color: rgb(95, 95, 95);
  background: rgba(185, 184, 184, 0.466);
  border-radius: 5px;
  /* .cancel {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    text-align: center;
    line-height: 20px;
    position: absolute;
    top: 0;
    right: -5px;
  } */
}
</style>