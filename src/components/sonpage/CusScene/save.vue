<template>
  <div id="save" class="lightsOff">
   <div class="addtit">
      <i class="el-icon-arrow-left" @click="goback"></i>
      一键关灯
    </div>
    <div class="animal-wrapper">
      <img id="animal-body" class="hide" src="static/img/17.png" alt />

      <div class="eye-wrapper">
        <div class="eye-inner-wrapper">
          <div class="eye">
            <div class="pupil"></div>
          </div>
        </div>

        <div class="eye-inner-wrapper">
          <div class="eye">
            <div class="pupil"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="switch-wrapper">
      <div class="string"></div>
      <div class="switch" @click="switchit">
        <div class="knot"></div>
        <div class="tassel"></div>
        <div class="gap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Axios from 'axios';
export default {
  name: "save",
  data() {
    return {};
  },
  methods: {
    goback() {
      history.go(-1);
      //   this.$router.back(-1);
    },
    switchit() {
      const $body = $("#save");
      const $eye = $(".eye");
      const $pupil = $(".pupil");
      const $switchWrapper = $(".switch-wrapper");
      const $animalBody = $("#animal-body");

      const swing = () => {
        $switchWrapper.addClass("swing");

        setTimeout(() => {
          $switchWrapper.removeClass("swing");
        }, 1000);
      };

      const randomAnimal = () => {
        let arr = [
          "https://res.cloudinary.com/tinachangcodes/image/upload/v1549635328/bear_wgyw8f.png",
          "https://res.cloudinary.com/tinachangcodes/image/upload/v1549635293/bunny_kpofl4.png"
        ];
        return arr[Math.floor(Math.random() * arr.length)];
      };
        if ($body.hasClass("lightsOn")) {
          $body.removeClass("lightsOn").addClass("lightsOff");
          $pupil.removeClass("center");
          $animalBody.addClass("hide");
        } else {
          $(".lightsOff")
            .find(".eye")
            .css("transform", "rotate(0deg)");
          $body.addClass("lightsOn").removeClass("lightsOff");
          $pupil.addClass("center");
          $animalBody.removeClass("hide").attr("src", randomAnimal());
        }

        swing();

      $(".string").on("mouseenter", swing);

      //the following code is referencing from Codewoofy: https://codepen.io/Codewoofy/pen/VeBJEP
      $body.mousemove(event => {
        event.preventDefault();
        let x = $eye.offset().left + $eye.width() / 2;
        let y = $eye.offset().top + $eye.height() / 2;
        let rad = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = rad * (180 / Math.PI) * -1 + 180;
        $(".lightsOff")
          .find(".eye")
          .css({ transform: "rotate(" + rot + "deg)" });
      });

       var userid = this.$store.state.username.userId;
        var msg={};
         msg.userId=userid;
        Axios.get(
        "http://182.92.194.165:8081/operate/device/updatealllamp",
        {
          params: msg
        },
        { contentType: "application/x-www-form-urlencoded; charset=utf-8" }
      ).then(res=>{
        
      }).catch(err=>{
        console.log(err);
        
      })
    }
  }
};
</script>
<style >
.lightsOff {
  background: #030f23;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.addtit {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 1.2rem;
  background: linear-gradient(to right, rgb(248, 69, 14), blue);
  -webkit-background-clip: text;
  color: transparent;
}
.addtit i {
  position: absolute;
  top: 15px;
  left: 5px;
  font-size: 2rem;
  color: grey;
}
.lightsOff .lightsOn {
  background: #efeddf;
}
.lightsOff .lightsOn .animal-wrapper .eye-wrapper .eye .pupil {
  width: 57px;
  height: 75px;
}
.lightsOff .lightsOn .switch-wrapper {
  top: -20px;
}
.lightsOff .lightsOn .switch-wrapper .string {
  background: #ff6347;
}
.lightsOff .lightsOn .switch-wrapper .knot,
.lightsOff .lightsOn .switch-wrapper .tassel {
  background: #ffc32d;
}
.lightsOff .lightsOn .switch-wrapper .gap {
  background: #efeddf;
}

.round,
.animal-wrapper .eye-wrapper .eye,
.animal-wrapper .eye-wrapper .eye .pupil,
.switch-wrapper .knot,
.switch-wrapper .tassel {
  border-radius: 50%;
  transform-origin: 50%;
}

.center,
.animal-wrapper .eye-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.swing {
  animation: swing 1s 1;
}

.hide {
  display: none;
}

.animal-wrapper {
  position: relative;
  margin-top: 150px;
}
.animal-wrapper #animal-body {
  position: absolute;
  bottom: -710px;
  left: 50%;
  transform: translateX(-50%);
}
.animal-wrapper .eye-wrapper {
  top: 195px;
  display: flex;
  justify-content: space-between;
  width: 280px;
}
.animal-wrapper .eye-wrapper .eye-inner-wrapper {
  animation: blink 4s infinite;
}
.animal-wrapper .eye-wrapper .eye {
  position: relative;
  background: #fff;
  border: 4px solid #000;
  width: 85px;
  height: 85px;
}
.animal-wrapper .eye-wrapper .eye .pupil {
  background: #000;
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 16px;
  right: 13px;
}
.switch {
  width: 7px;
}
.switch-wrapper {
  position: absolute;
  top: 0;
  left: 20%;
  transition: all 0.2s;
}
.switch-wrapper .string {
  background: #fff;
  width: 7px;
  height: 280px;
}
.switch-wrapper .knot,
.switch-wrapper .tassel {
  cursor: pointer;
  background: #daa520;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.switch-wrapper .knot {
  width: 28px;
  height: 22px;
  bottom: 71px;
}
.switch-wrapper .tassel {
  width: 105px;
  height: 75px;
  bottom: -2px;
  -webkit-clip-path: polygon(38% 0, 62% 0, 80% 100%, 20% 100%);
  clip-path: polygon(38% 0, 62% 0, 80% 100%, 20% 100%);
}
.switch-wrapper .gap {
  background: #030f23;
  width: 20px;
  height: 20px;
  -webkit-clip-path: polygon(49% 0, 29% 100%, 56% 100%);
  clip-path: polygon(49% 0, 29% 100%, 56% 100%);
  position: absolute;
  bottom: 0;
  left: -22px;
}

@keyframes blink {
  0%,
  100% {
    transform: scaleY(0.01);
  }
  5%,
  95% {
    transform: scaleY(1);
  }
}
@keyframes swing {
  0%,
  100% {
    transform: rotate(0deg) translate(0);
  }
  25% {
    transform: rotate(-2deg) translateX(10px);
  }
  50% {
    transform: rotate(2deg) translateX(-10px);
  }
}
</style>