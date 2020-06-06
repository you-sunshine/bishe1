<template>
  <div id="my" :style="bgphoto" class="my">
    <div class="myhead">
      <div class="m1">
        <img src="static/img/tou2.PNG" alt />
      </div>
      <router-link class="m2" to="/login" v-if="!this.istrue">请登录</router-link>
      <div class="m2" v-else>{{this.username}}的小窝</div>
      <div class="m3"></div>
    </div>
    <div class="something">
      <div class="guanli">
        <router-link class="set_it" to="/deviceguan">
          <div>
            <i class="el-icon-coin"></i>
          </div>
          <span>设备管理</span>
        </router-link>
      </div>
      <div class="guanli">
        <router-link class="set_it" to="/myset">
          <div>
            <i class="el-icon-setting"></i>
          </div>
          <span>设置</span>
        </router-link>
      </div>
    </div>

    <div class="smiley">
      <div class="leftEye"></div>
      <div class="rightEye"></div>
      <div class="mouth"></div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Axios from "axios";
export default {
  name: "my",
  data() {
    return {
      username: "",
      istrue: "",
      bgphoto: {
        height: $(window).height() + "px",
        width: $(window).width() + "px"
      }
    };
  },
  methods: {},
  mounted() {
    this.istrue = JSON.parse(localStorage.getItem("Flag"));
    this.username = this.$store.state.username.username;

  
  }
};
</script>
<style >
.my {
background-image: linear-gradient(-55deg, #ace0f9 0%, #fff1eb 100%)
}
.myhead {
  width: 97.5%;
  height: 150px;
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  line-height: 150px;
  margin-bottom: 10px;
}
.m1 {
  flex: 2;
}
.m2 {
  flex: 2;
  font-size: 1.2rem;
   background: linear-gradient(to right, rgb(248, 14, 190), blue);
  -webkit-background-clip: text;
  color: transparent;
}
.m3 {
  flex: 1;
}
.m1 img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 40px;
  margin-left: 25px;
}

.guanli {
  width: 100%;
background-image: linear-gradient(to left, #a9e3fd 0%, #fff1eb 100%);
  line-height: 55px;
  height: 55px;
  margin-bottom: 10px;
}
.set_it {
  width: 100%;
  height: 100%;
}
.set_it span {
  display: inline-block;
}
.set_it div {
  float: left;
  width: 40px;
  height: 100%;
  padding-left: 5px;
  line-height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
}
.set_it div i {
  font-size: 1.5rem;
  align-items: center;
}


.smiley {
  width: 100px;
  height: 100px;
  background: #f79dce;
  background: -webkit-radial-gradient(center, ellipse, #f5aebd 0%, #f87e7e 100%);
  background: radial-gradient(ellipse at center, #f5aebdd5 0%, #ffacacc5 100%);
  border-radius: 50%;
  position: relative;
  left: 50%;
  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%);
  top: 50px;
  /* -webkit-animation: move 20s infinite; */
          animation: move 20s infinite;
}

.leftEye, .rightEye {
  width: 20px;
  height: 20px;
  background: rgb(128, 127, 127);
  border-radius: 50%;
  position: absolute;
}

.leftEye {
  left: 15px;
  top: 25px;
}

.rightEye {
  right: 15px;
  top: 25px;
  /* -webkit-animation: blink 7s infinite; */
          animation: blink 7s infinite;
}

.mouth {
  width: 50px;
  height: 22px;
  background: rgb(128, 127, 127);
  border-radius: 10px 10px 75px 75px;
  border-bottom-left-radius: 100px 75px;
  border-bottom-right-radius: 100px 75px;
  position: absolute;
  bottom: 14px;
  left:25px;
  /* -webkit-animation: emotions 5s infinite; */
          animation: emotions 5s infinite;
}



@keyframes blink {
  48% {
    height: 20px;
    top: 25px;
    border-radius: 50%;
  }
  50% {
    height: 0;
    top: 50px;
    border-radius: 10px;
  }
  52% {
    height: 20px;
    top:25px;
    border-radius: 50%;
  }
}

@keyframes move {
  0% {
    left: 0;
    top: 20vh;
    -webkit-transform: translate(0, -50%) rotateZ(0);
            transform: translate(0, -50%) rotateZ(0);
  }
  25% {
    left: 50%;
    top: 10vh;
    -webkit-transform: translate(-50%, 0) rotateZ(180deg);
            transform: translate(-50%, 0) rotateZ(180deg);
  }
  50% {
    left: 100%;
    top: 20vh;
    -webkit-transform: translate(-100%, -50%) rotate(360deg);
            transform: translate(-100%, -50%) rotate(360deg);
  }
  75% {
    left: 50%;
    top: 40vh;
    -webkit-transform: translate(-50%, -100%) rotate(180deg);
            transform: translate(-50%, -100%) rotate(180deg);
  }
  100% {
    left: 0;
    top: 30vh;
    -webkit-transform: translate(0, -50%) rotate(0);
            transform: translate(0, -50%) rotate(0);
  }
}

@keyframes emotions {
  0% {
    width: 50px;
    height: 22px;
    border-radius: 10px 10px 75px 75px;
    -webkit-border-bottom-left-radius: 100px 75px;
    -webkit-border-bottom-right-radius: 100px 75px;
    left: 25px;
  }
  33% {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    -webkit-border-bottom-left-radius: 50%;
    -webkit-border-bottom-right-radius: 50%;
    bottom: 14px;
    left: 40px;
  }
  66% {
    width: 50px;
    height: 22px;
    border-radius: 75px 75px 10px 10px;
    -webkit-border-top-left-radius: 100px 75px;
    -webkit-border-top-right-radius: 100px 75px;
    bottom:20px;
    left: 25px;
  }
  100% {
    width: 50px;
    height: 22px;
    border-radius: 10px 10px 75px 75px;
    -webkit-border-bottom-left-radius: 100px 75px;
    -webkit-border-bottom-right-radius: 100px 75px;
    bottom:14px;
    left: 25px;
  }
}

</style>