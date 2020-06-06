<template>
  <div id="myset" :style="bgphoto2"> 
    <div class="mine">
      <i class="el-icon-arrow-left" @click="returnhome"></i>
      <span>个人设置</span>
    </div>
    <router-link class="gaipwd" to="/changPwd">修改密码</router-link>
    <div class="bird">
      <div class="big"></div>
      <div class="middle"></div>
      <div class="small"></div>
    </div>
    <div @click="tologin" class="gotologin">退出登录</div>
  </div>
</template>
<script>
import axios from "axios";
import Storage from "../../storage/storage";
import $ from "jquery";
export default {
  name: "myset",
  data() {
    return {
      content: "",
      istrue: false,
       bgphoto2: {
        height: $(window).height() + "px",
        width: $(window).width() + "px",
      }
    };
  },
  methods: {
    tologin() {
      localStorage.setItem("Flag", this.istrue);
      localStorage.removeItem("state");
      this.$router.push({
        path: "/login"
      });
    },
    returnhome() {
      history.go(-1);
    }
  }
};
</script>
<style >
.gotologin {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: rgb(78, 78, 75);
  font-size:1.1rem;
  background: rgb(235, 180, 180);
}
.mine {
  display: block;
  padding-left: 15px;
  height: 60px;
  line-height: 60px;
  background-image: linear-gradient(to right, #cee7dc 0%, hsla(298, 76%, 87%, 0.61) 100%);
  text-align: center;
  font-size: 1.1rem;
  display: flex;
  flex-direction: row;
  color: #fff;
  align-items: center;
}
.mine i {
  font-size: 2.1rem;
  align-items: center;
}
.mine span {
  display: inline-block;
  flex: 1;
  font-size: 1.1rem;
  padding-right: 44px;
  color: rgb(181, 184, 22);
}

.gaipwd {
  margin-top: 5px;
  display: block;
  padding-left: 15px;
  height: 50px;
  color: rgb(181, 184, 22);
  line-height: 50px;
  background: rgba(245, 245, 245, 0.322);
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#myset {
  background: #c9cbfc;
}
.bird {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  cursor: pointer;

  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
}
.big {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border-color: transparent transparent #d72928 #db3e3d;
  border-width: 100px;
  border-style: solid;

  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);

  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
}
.middle {
  position: absolute;
  top: 10%;
  left: 10%;
  border-radius: 50%;
  border-color: #f8d245 transparent #f2f2f2 #fff;
  border-style: solid;
  border-width: 80px;

  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);

  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
}
.small {
  position: absolute;
  top: 30%;
  left: 30%;
  border-radius: 50%;
  border-color: transparent #f7a703 transparent transparent;
  border-style: solid;
  border-width: 40px;

  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);

  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
}
.small:before {
  content: "";
  background: #000;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  right: 20px;
}
.bird:hover .big {
  transform: rotate(225deg);
  -webkit-transform: rotate(225deg);
  -moz-transform: rotate(225deg);

  border-color: transparent transparent #1fe8b6 #16d7a7;
}
.bird:hover .middle {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);

  border-color: transparent #f8d245 #fff #f2f2f2;
}
.bird:hover .small {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);

  border-color: transparent #f7a703 transparent transparent;
}
</style>