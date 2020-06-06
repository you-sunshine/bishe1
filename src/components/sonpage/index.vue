<template>
  <div id="first" :style="bgphoto">
    <div class="head">
      <span class="title">
        <router-link class="t_name" to="/login" v-if="!this.istrue">登录/注册</router-link>
        <div v-else  class="t_name" >{{this.username}}的家</div>
      </span>
      <span v-if="!this.istrue" class="number">{{this.num}}个设备</span>
      <span v-else class="number">{{this.num}}个设备</span>
      <div class="add" @click="addset">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div class="weather">
      <Weather></Weather>
    </div>
    <div class="all">全部</div>
    <div class="myset">
      <div class="settit" v-if="this.num == 0">
        <ul class="heart">
          <li class="h_1"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p>暂无设备，请点击“ + ”开始添加</p>
      </div>
      <div class="allsets" v-else>
        <ul class="set_meun">
          <li class="setlist" v-for="(item,index) in userSet" :key="index">
            <router-link :to="{path:item.action,query: {'devices':item}}">
              <img :src="item.imgSrc" alt />
              <p>{{item.deviceChName}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Weather from "../detailpage/weather";
import Storage from "../../storage/storage";
import Axios from "axios";
import qs from "qs";
export default {
  name: "first",
  components: {
    Weather
  },
  data() {
    return {
      username: "",
      myset: [],
      istrue: "",
      num: "",
      bgphoto: {
        width: $(window).width() + "px"
      },
      userSet: []
    };
  },
  methods: {
    addset() {
      this.istrue = JSON.parse(localStorage.getItem("Flag"));
      if (this.istrue) {
        this.$router.push({
          path: "/add"
        });
      } else {
        alert("请前去登录！");
      }
    }
  },
  mounted() {
    if (this.num !== 0) {
  
     console.log( );
     $('.h_1').stop();
    }

    $(".t_name").on("touchstart", function(event) {
      $(this).addClass("yellowcolor");
      event.stopPropagation();
    });
    $(".t_name").on("touchend", function(event) {
      $(this).removeClass("yellowcolor");
      event.stopPropagation();
    });
    $(".add i").on("touchstart", function(event) {
      $(this).addClass("yellowcolor");
      event.stopPropagation();
    });
    $(".add i").on("touchend", function(event) {
      $(this).removeClass("yellowcolor");
      event.stopPropagation();
    });
    this.istrue = JSON.parse(localStorage.getItem("Flag"));
    var h = $(window).height();
    if (this.istrue == false) {
      this.num = 0;
    }
    this.username = this.$store.state.username.username;
    //  获取用户设备
    var userId = this.$store.state.username.userId;
    var data = {};
    data.userId = userId;
    data.cusId = 2;
    if (this.istrue) {
      Axios({
        method: "POST",
        url: "http://182.92.194.165:8081/operate/device/cusScene",
        data: qs.stringify(data),
        dataType: "json",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => {
          this.userSet = res.data.data.list;
          this.num = this.userSet.length;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style >
#first {
  background-color: #8ec5fc;
  background-image: linear-gradient(
    62deg,
    #8ec5fc 0%,
    #e0c3fc 50%,
    #ffffff 100%
  );
}
.head {
  position: relative;
  width: 100%;
  height: 55px;
}
.t_name {
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  color: transparent;
}
.add {
  position: absolute;
  top: 4px;
  right: 0;
  width: 50px;
  height: 45px;
  font-size: 2rem;
}
.add i {
  padding-left: 0.5rem;
}
.title {
  display: inline-block;
  padding-left: 10px;
  padding-top: 3px;
  letter-spacing: 0.2rem;
  font-size: 20px;
  /* color: rgb(12, 12, 12); */
}

.number {
  position: absolute;
  left: 10px;
  bottom: 3px;
  display: inline-block;
  font-size: 0.8rem;
  color: rgb(129, 126, 126);
}
.weather {
  height: 150px;
}
.all {
  position: relative;
  height: 24px;
  width: 100%;
  font-size: 15px;
  color: rgb(88, 77, 236);
  margin-left: 8px;
  letter-spacing: 0.1rem;
  padding-top: 25px;
}
.all:after {
  content: " ";
  position: absolute;
  width: 20px;
  height: 1px;
  bottom: 1px;
  left: 3px;
  background: rgb(78, 100, 228);
}
.myset {
  width: 100%;
  overflow-y: scroll;
}

.allsets {
  width: 100%;
  height: 500px;
}
.set_meun {
  width: 100%;
  height: 1000px;
  margin-top: 20px;
  margin-bottom: 60px;
}
.setlist {
  width: 32.3%;
  height: 110px;
  float: left;
  text-align: center;
  margin-bottom: 10px;
}
.setlist img {
  width: 80px;
  height: 80px;
  background: chocolate;
}
.setlist p {
  font-size: 0.9rem;
  color: rgb(10, 1, 131);
}
.yellowcolor {
  color: #ffd400;
}
.settit {
  display: flex; /*弹性盒模型*/
  justify-content: center; /*主轴方向居中显示*/
  padding-top: 70px;
  height: 100vh;
}

.settit p {
  position: absolute;
  top: 412px;
  left: 61px;
  width: 400px;
  height: 30px;
  color: #fff;
  font-size: 1.1rem;
}
.heart {
  position: absolute;
  height: 200px;
}
.heart li {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 10px;
}
 .heart li:nth-child(1) {
  background-color: #f876a4;
  animation: love1 4s infinite;
}
 .heart li:nth-child(2) {
  background-color: #d283f7;
  animation: love2 4s infinite;
  animation-delay: 0.15s;
}
 .heart li:nth-child(3) {
  background-color: #facc68c7;
  animation: love3 4s infinite;
  animation-delay: 0.3s;
}
 .heart li:nth-child(4) {
  background-color: #d4fdc7bb;
  animation: love4 4s infinite;
  animation-delay: 0.45s;
}
 .heart li:nth-child(5) {
  background-color: #93d0f3cc;
  animation: love5 4s infinite;
  animation-delay: 0.6s;
}
 .heart li:nth-child(6) {
  background-color: #9efac1d5;
  animation: love4 4s infinite;
  animation-delay: 0.75s;
}
 .heart li:nth-child(7) {
  background-color: #fdff7b;
  animation: love3 4s infinite;
  animation-delay: 0.9s;
}
 .heart li:nth-child(8) {
  background-color: #fcbddc;
  animation: love2 4s infinite;
  animation-delay: 1.05s;
}
 .heart li:nth-child(9) {
  background-color: #fd99a7;
  animation: love1 4s infinite;
  animation-delay: 1.2s;
}
@keyframes love1 {
  30%,
  50% {
    height: 60px;
    transform: translateY(-30px);
  }
  75%,
  100% {
    height: 20px;
    transform: translateY(0);
  }
}
@keyframes love2 {
  30%,
  50% {
    height: 125px;
    transform: translateY(-62.5px);
  }
  75%,
  100% {
    height: 20px;
    transform: translateY(0);
  }
}
@keyframes love3 {
  30%,
  50% {
    height: 160px;
    transform: translateY(-75px);
  }
  75%,
  100% {
    height: 20px;
    transform: translateY(0);
  }
}
@keyframes love4 {
  30%,
  50% {
    height: 180px;
    transform: translateY(-60px);
  }
  75%,
  100% {
    height: 20px;
    transform: translateY(0);
  }
}
@keyframes love5 {
  30%,
  50% {
    height: 190px;
    transform: translateY(-45px);
  }
  75%,
  100% {
    height: 20px;
    transform: translateY(0);
  }
}
</style>