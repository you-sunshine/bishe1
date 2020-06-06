<template>
  <div id="leave" :style="bgphoto">
    <div class="addtit">
      <i class="el-icon-arrow-left" @click="goback"></i>
      安&nbsp;心&nbsp;离&nbsp;家
    </div>
     <div id="boxes1"  @click="change_c">
        <div style="--color: rgb(148, 126, 245)" ></div>
      </div>
    
    <section class="fireCont"></section>
    <section class="fireCont"></section>
    <section class="fireCont"></section>
    <section class="fireCont"></section>
    <section class="firetap"></section>
    <section class="firetap"></section>
    <section class="firetap"></section>
    <section class="firetap"></section>
  </div>
</template>

<script>
import $ from "jquery";
import Axios from 'axios';

export default {
  name: "leave",
  data() {
    return {
      bgphoto: {
        height: $(window).height() + "px",
        width: $(window).width() + "px"
      }
    };
  },
  methods: {
    goback() {
      history.go(-1);
      //   this.$router.back(-1);
    },
    change_c(){
        var userid = this.$store.state.username.userId;
        var msg={};
         msg.userId=userid;
        Axios.get(
        "http://182.92.194.165:8081/operate/device/updateall",
        {
          params: msg
        },
        { contentType: "application/x-www-form-urlencoded; charset=utf-8" }
      ).then(res=>{
        
      }).catch(err=>{
        console.log(err);
        
      })
    }
  },
  mounted() {
    var i;
    for (i = 0; i < 39; i++) {
      $(".fireCont").append('<div class="fire"></div>');
      $(".firetap").append('<div class="firetip"></div>');
    }
  }
};
</script>
<style >
#leave {
  color:rgb(148, 126, 245);
  overflow: hidden;
  padding: 0;
  margin: 0;
  background: linear-gradient(to bottom, #101326 70%, #303344 100%);
}
.addtit {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 1.2rem;
  background: linear-gradient(to right, rgb(252, 87, 37), rgb(235, 219, 252));
  -webkit-background-clip: text;
  color: transparent;
}
.addtit i {
  position: absolute;
  top: 15px;
  left: 5px;
  font-size: 2rem;
  color: rgb(250, 250, 250);
}
#boxes1 div { 
  display: -webkit-box; 
  display: -ms-flexbox; 
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center; 
  -webkit-box-pack: center; 
      -ms-flex-pack: center; 
          justify-content: center;
}


@media (max-width: 320px) {
  #boxes1 {
    grid-template-columns: repeat(2, 1fr);
  }
}

#boxes1 div {
position: relative;
  counter-increment: number;
  width:80px;
  height: 80px;
  min-width: 40px;
  min-height:40px;
  -webkit-transition: .5s all ease;
  transition: .5s all ease;
  background: var(--color, #aaa);
  border: 0 solid transparent;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border-radius: 50%;
  margin-left:50%;
  margin-top:3rem;
  left:-40px;
  opacity: .8;
  --dx: calc(var(--size) - var(--x));
  --dy: calc(var(--size) - var(--y));
}

 #boxes1 div {
  --x: 84;
  --y: 75;
  --size: 128;
}
#boxes1 div:hover {
  opacity: 1;
  cursor: pointer;
  border: calc(2px + .85vw) solid rgba(255, 255, 255, .5);
  -webkit-transition:
    .5s background-color ease,
    .2s border ease;
  transition:
    .5s background-color ease,
    .2s border ease;

  border-radius:
    calc(var(--x) / var(--size) * 100%) 
    calc(var(--dx) / var(--size) * 100%)
    calc(var(--dx) / var(--size) * 100%) 
    calc(var(--x) / var(--size) * 100%) / 
    calc(var(--y) / var(--size) * 100%) 
    calc(var(--y) / var(--size) * 100%) 
    calc(var(--dy) / var(--size) * 100%) 
    calc(var(--dy) / var(--size) * 100%) 
}


#boxes1 div:after {
  content:"开启离家模式";
  color: rgba(255, 255, 255, 0);
  font-size: calc(0.3vw + 1em);
  font-weight: 200;
  text-align: center;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
  -webkit-transition-delay: .1s;
          transition-delay: .1s;
  -webkit-transform: translate3d(0, -.5em, 0);
          transform: translate3d(0, -.5em, 0);
}

 #boxes1 div:first-child:after,
#boxes1 div:hover:after {
  color: rgba(255, 255, 255, .7);
  -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}
.firetap:nth-child(5) {
  position: absolute;
  bottom: 170px;
  left: 0;
  width: 1920px;
  height: 200px;
  display: flex;
  align-items: flex-end;
}

.firetap:nth-child(6) {
  position: absolute;
  bottom: 130px;
  left: 0;
  width: 1920px;
  height: 200px;
  display: flex;
  align-items: flex-end;
}

.firetap:nth-child(7) {
  position: absolute;
  bottom: 120px;
  left: 0;
  width: 1920px;
  height: 200px;
  display: flex;
  align-items: flex-end;
}

.firetap:nth-child(8) {
  position: absolute;
  bottom: 100px;
  left: 0;
  width: 1920px;
  height: 200px;
  display: flex;
  align-items: flex-end;
}

.firetap:nth-child(5) .firetip {
  width: 50px;
  height: 50px;
  background: #d21b00;
  box-shadow: 0px 0px 45px 5px rgba(206, 30, 4, 0.5);
  border-radius: 25px;
  opacity: 0;
}

.firetap:nth-child(6) .firetip {
  width: 50px;
  height: 50px;
  background: #fa9755;
  box-shadow: 0px 0px 45px 5px rgba(245, 60, 60, 0.5);
  border-radius: 25px;
  opacity: 0;
}

.firetap:nth-child(7) .firetip {
  width: 50px;
  height: 50px;
  background: #e94403;
  box-shadow: 0px 0px 45px 5px rgba(253, 117, 63, 0.5);
  border-radius: 25px;
  opacity: 0;
}

.firetap:nth-child(8) .firetip {
  width: 50px;
  height: 50px;
  background: #f3cd86;
  box-shadow: 0px 0px 45px 5px rgba(254, 241, 217, 0.5);
  border-radius: 25px;
  opacity: 0;
}

.fireCont {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 1920px;
  height: 500px;
  display: flex;
  align-items: flex-end;
}

.fire {
  position: relative;
  float: left;
  width: 50px;
  border-radius: 25px;
  height: 100%;
}

.fireCont:nth-child(1) {
  height: 200px;
}

.fireCont:nth-child(1) .fire {
  background: #d21b00;
  box-shadow: 0px 0px 45px 5px rgba(206, 30, 4, 0.5);
}

.fireCont:nth-child(2) {
  height: 190px;
}

.fireCont:nth-child(2) .fire {
  background: #f31505;
  box-shadow: 0px 0px 45px 5px rgba(247, 59, 26, 0.5);
}

.fireCont:nth-child(3) {
  height: 150px;
}

.fireCont:nth-child(3) .fire {
  background: #fa9755;
  box-shadow: 0px 0px 45px 5px rgba(252, 240, 195, 0.5);
}

.fireCont:nth-child(4) {
  height: 130px;
}

.fireCont:nth-child(4) .fire {
  background: #f5e6ca;
  box-shadow: 0px 0px 45px 5px rgba(255, 237, 205, 0.5);
}

.fireCont:nth-child(1) .fire:nth-child(1) {
  animation: flameone 1s ease-in-out 0.09s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(1) {
  animation: flametwo 2s ease-in 0.09s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(1) {
  animation: flamethree 3s ease 0.09s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(1) {
  animation: flamefour 1s ease-out 0.09s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(1) {
  animation: flameoff 3s ease-in-out 0.09s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(1) {
  animation: flameoff 1s ease-in-out 0.09s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(1) {
  animation: flameoff 1s ease-in-out 0.09s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(1) {
  animation: flameoff 4s ease-in-out 0.09s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(2) {
  animation: flameone 3s ease-in-out 0.18s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(2) {
  animation: flametwo 3s ease-in 0.18s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(2) {
  animation: flamethree 1s ease 0.18s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(2) {
  animation: flamefour 1s ease-out 0.18s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(2) {
  animation: flameoff 1s ease-in-out 0.18s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(2) {
  animation: flameoff 1s ease-in-out 0.18s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(2) {
  animation: flameoff 2s ease-in-out 0.18s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(2) {
  animation: flameoff 1s ease-in-out 0.18s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(3) {
  animation: flameone 1s ease-in-out 0.27s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(3) {
  animation: flametwo 2s ease-in 0.27s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(3) {
  animation: flamethree 3s ease 0.27s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(3) {
  animation: flamefour 1s ease-out 0.27s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(3) {
  animation: flameoff 5s ease-in-out 0.27s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(3) {
  animation: flameoff 3s ease-in-out 0.27s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(3) {
  animation: flameoff 4s ease-in-out 0.27s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(3) {
  animation: flameoff 5s ease-in-out 0.27s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(4) {
  animation: flameone 3s ease-in-out 0.36s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(4) {
  animation: flametwo 1s ease-in 0.36s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(4) {
  animation: flamethree 1s ease 0.36s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(4) {
  animation: flamefour 1s ease-out 0.36s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(4) {
  animation: flameoff 3s ease-in-out 0.36s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(4) {
  animation: flameoff 5s ease-in-out 0.36s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(4) {
  animation: flameoff 4s ease-in-out 0.36s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(4) {
  animation: flameoff 2s ease-in-out 0.36s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(5) {
  animation: flameone 1s ease-in-out 0.45s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(5) {
  animation: flametwo 2s ease-in 0.45s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(5) {
  animation: flamethree 1s ease 0.45s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(5) {
  animation: flamefour 3s ease-out 0.45s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(5) {
  animation: flameoff 3s ease-in-out 0.45s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(5) {
  animation: flameoff 4s ease-in-out 0.45s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(5) {
  animation: flameoff 2s ease-in-out 0.45s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(5) {
  animation: flameoff 1s ease-in-out 0.45s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(6) {
  animation: flameone 3s ease-in-out 0.54s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(6) {
  animation: flametwo 1s ease-in 0.54s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(6) {
  animation: flamethree 3s ease 0.54s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(6) {
  animation: flamefour 1s ease-out 0.54s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(6) {
  animation: flameoff 3s ease-in-out 0.54s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(6) {
  animation: flameoff 3s ease-in-out 0.54s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(6) {
  animation: flameoff 2s ease-in-out 0.54s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(6) {
  animation: flameoff 5s ease-in-out 0.54s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(7) {
  animation: flameone 3s ease-in-out 0.63s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(7) {
  animation: flametwo 2s ease-in 0.63s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(7) {
  animation: flamethree 2s ease 0.63s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(7) {
  animation: flamefour 2s ease-out 0.63s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(7) {
  animation: flameoff 5s ease-in-out 0.63s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(7) {
  animation: flameoff 2s ease-in-out 0.63s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(7) {
  animation: flameoff 2s ease-in-out 0.63s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(7) {
  animation: flameoff 4s ease-in-out 0.63s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(8) {
  animation: flameone 2s ease-in-out 0.72s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(8) {
  animation: flametwo 3s ease-in 0.72s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(8) {
  animation: flamethree 3s ease 0.72s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(8) {
  animation: flamefour 2s ease-out 0.72s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(8) {
  animation: flameoff 4s ease-in-out 0.72s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(8) {
  animation: flameoff 2s ease-in-out 0.72s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(8) {
  animation: flameoff 3s ease-in-out 0.72s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(8) {
  animation: flameoff 2s ease-in-out 0.72s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(9) {
  animation: flameone 1s ease-in-out 0.81s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(9) {
  animation: flametwo 3s ease-in 0.81s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(9) {
  animation: flamethree 2s ease 0.81s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(9) {
  animation: flamefour 1s ease-out 0.81s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(9) {
  animation: flameoff 1s ease-in-out 0.81s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(9) {
  animation: flameoff 3s ease-in-out 0.81s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(9) {
  animation: flameoff 2s ease-in-out 0.81s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(9) {
  animation: flameoff 5s ease-in-out 0.81s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(10) {
  animation: flameone 3s ease-in-out 0.9s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(10) {
  animation: flametwo 1s ease-in 0.9s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(10) {
  animation: flamethree 3s ease 0.9s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(10) {
  animation: flamefour 2s ease-out 0.9s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(10) {
  animation: flameoff 4s ease-in-out 0.9s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(10) {
  animation: flameoff 4s ease-in-out 0.9s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(10) {
  animation: flameoff 4s ease-in-out 0.9s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(10) {
  animation: flameoff 1s ease-in-out 0.9s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(11) {
  animation: flameone 1s ease-in-out 0.99s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(11) {
  animation: flametwo 2s ease-in 0.99s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(11) {
  animation: flamethree 1s ease 0.99s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(11) {
  animation: flamefour 2s ease-out 0.99s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(11) {
  animation: flameoff 2s ease-in-out 0.99s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(11) {
  animation: flameoff 4s ease-in-out 0.99s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(11) {
  animation: flameoff 4s ease-in-out 0.99s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(11) {
  animation: flameoff 1s ease-in-out 0.99s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(12) {
  animation: flameone 3s ease-in-out 1.08s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(12) {
  animation: flametwo 2s ease-in 1.08s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(12) {
  animation: flamethree 1s ease 1.08s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(12) {
  animation: flamefour 3s ease-out 1.08s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(12) {
  animation: flameoff 1s ease-in-out 1.08s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(12) {
  animation: flameoff 1s ease-in-out 1.08s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(12) {
  animation: flameoff 1s ease-in-out 1.08s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(12) {
  animation: flameoff 2s ease-in-out 1.08s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(13) {
  animation: flameone 1s ease-in-out 1.17s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(13) {
  animation: flametwo 2s ease-in 1.17s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(13) {
  animation: flamethree 3s ease 1.17s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(13) {
  animation: flamefour 3s ease-out 1.17s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(13) {
  animation: flameoff 2s ease-in-out 1.17s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(13) {
  animation: flameoff 4s ease-in-out 1.17s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(13) {
  animation: flameoff 2s ease-in-out 1.17s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(13) {
  animation: flameoff 1s ease-in-out 1.17s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(14) {
  animation: flameone 3s ease-in-out 1.26s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(14) {
  animation: flametwo 2s ease-in 1.26s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(14) {
  animation: flamethree 3s ease 1.26s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(14) {
  animation: flamefour 1s ease-out 1.26s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(14) {
  animation: flameoff 4s ease-in-out 1.26s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(14) {
  animation: flameoff 3s ease-in-out 1.26s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(14) {
  animation: flameoff 2s ease-in-out 1.26s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(14) {
  animation: flameoff 5s ease-in-out 1.26s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(15) {
  animation: flameone 2s ease-in-out 1.35s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(15) {
  animation: flametwo 2s ease-in 1.35s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(15) {
  animation: flamethree 1s ease 1.35s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(15) {
  animation: flamefour 2s ease-out 1.35s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(15) {
  animation: flameoff 5s ease-in-out 1.35s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(15) {
  animation: flameoff 4s ease-in-out 1.35s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(15) {
  animation: flameoff 1s ease-in-out 1.35s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(15) {
  animation: flameoff 3s ease-in-out 1.35s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(16) {
  animation: flameone 2s ease-in-out 1.44s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(16) {
  animation: flametwo 2s ease-in 1.44s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(16) {
  animation: flamethree 3s ease 1.44s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(16) {
  animation: flamefour 1s ease-out 1.44s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(16) {
  animation: flameoff 4s ease-in-out 1.44s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(16) {
  animation: flameoff 4s ease-in-out 1.44s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(16) {
  animation: flameoff 3s ease-in-out 1.44s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(16) {
  animation: flameoff 1s ease-in-out 1.44s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(17) {
  animation: flameone 3s ease-in-out 1.53s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(17) {
  animation: flametwo 1s ease-in 1.53s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(17) {
  animation: flamethree 3s ease 1.53s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(17) {
  animation: flamefour 3s ease-out 1.53s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(17) {
  animation: flameoff 1s ease-in-out 1.53s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(17) {
  animation: flameoff 3s ease-in-out 1.53s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(17) {
  animation: flameoff 3s ease-in-out 1.53s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(17) {
  animation: flameoff 5s ease-in-out 1.53s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(18) {
  animation: flameone 3s ease-in-out 1.62s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(18) {
  animation: flametwo 1s ease-in 1.62s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(18) {
  animation: flamethree 2s ease 1.62s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(18) {
  animation: flamefour 3s ease-out 1.62s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(18) {
  animation: flameoff 3s ease-in-out 1.62s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(18) {
  animation: flameoff 5s ease-in-out 1.62s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(18) {
  animation: flameoff 1s ease-in-out 1.62s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(18) {
  animation: flameoff 4s ease-in-out 1.62s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(19) {
  animation: flameone 1s ease-in-out 1.71s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(19) {
  animation: flametwo 3s ease-in 1.71s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(19) {
  animation: flamethree 2s ease 1.71s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(19) {
  animation: flamefour 1s ease-out 1.71s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(19) {
  animation: flameoff 4s ease-in-out 1.71s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(19) {
  animation: flameoff 1s ease-in-out 1.71s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(19) {
  animation: flameoff 1s ease-in-out 1.71s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(19) {
  animation: flameoff 4s ease-in-out 1.71s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(20) {
  animation: flameone 3s ease-in-out 1.8s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(20) {
  animation: flametwo 2s ease-in 1.8s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(20) {
  animation: flamethree 3s ease 1.8s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(20) {
  animation: flamefour 3s ease-out 1.8s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(20) {
  animation: flameoff 3s ease-in-out 1.8s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(20) {
  animation: flameoff 4s ease-in-out 1.8s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(20) {
  animation: flameoff 2s ease-in-out 1.8s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(20) {
  animation: flameoff 4s ease-in-out 1.8s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(21) {
  animation: flameone 1s ease-in-out 1.89s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(21) {
  animation: flametwo 2s ease-in 1.89s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(21) {
  animation: flamethree 3s ease 1.89s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(21) {
  animation: flamefour 1s ease-out 1.89s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(21) {
  animation: flameoff 1s ease-in-out 1.89s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(21) {
  animation: flameoff 1s ease-in-out 1.89s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(21) {
  animation: flameoff 1s ease-in-out 1.89s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(21) {
  animation: flameoff 2s ease-in-out 1.89s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(22) {
  animation: flameone 1s ease-in-out 1.98s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(22) {
  animation: flametwo 3s ease-in 1.98s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(22) {
  animation: flamethree 3s ease 1.98s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(22) {
  animation: flamefour 2s ease-out 1.98s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(22) {
  animation: flameoff 2s ease-in-out 1.98s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(22) {
  animation: flameoff 3s ease-in-out 1.98s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(22) {
  animation: flameoff 5s ease-in-out 1.98s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(22) {
  animation: flameoff 2s ease-in-out 1.98s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(23) {
  animation: flameone 3s ease-in-out 2.07s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(23) {
  animation: flametwo 2s ease-in 2.07s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(23) {
  animation: flamethree 3s ease 2.07s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(23) {
  animation: flamefour 1s ease-out 2.07s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(23) {
  animation: flameoff 2s ease-in-out 2.07s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(23) {
  animation: flameoff 2s ease-in-out 2.07s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(23) {
  animation: flameoff 2s ease-in-out 2.07s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(23) {
  animation: flameoff 1s ease-in-out 2.07s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(24) {
  animation: flameone 1s ease-in-out 2.16s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(24) {
  animation: flametwo 1s ease-in 2.16s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(24) {
  animation: flamethree 2s ease 2.16s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(24) {
  animation: flamefour 3s ease-out 2.16s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(24) {
  animation: flameoff 4s ease-in-out 2.16s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(24) {
  animation: flameoff 1s ease-in-out 2.16s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(24) {
  animation: flameoff 1s ease-in-out 2.16s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(24) {
  animation: flameoff 2s ease-in-out 2.16s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(25) {
  animation: flameone 3s ease-in-out 2.25s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(25) {
  animation: flametwo 3s ease-in 2.25s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(25) {
  animation: flamethree 2s ease 2.25s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(25) {
  animation: flamefour 1s ease-out 2.25s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(25) {
  animation: flameoff 1s ease-in-out 2.25s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(25) {
  animation: flameoff 4s ease-in-out 2.25s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(25) {
  animation: flameoff 1s ease-in-out 2.25s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(25) {
  animation: flameoff 3s ease-in-out 2.25s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(26) {
  animation: flameone 3s ease-in-out 2.34s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(26) {
  animation: flametwo 2s ease-in 2.34s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(26) {
  animation: flamethree 1s ease 2.34s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(26) {
  animation: flamefour 1s ease-out 2.34s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(26) {
  animation: flameoff 3s ease-in-out 2.34s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(26) {
  animation: flameoff 2s ease-in-out 2.34s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(26) {
  animation: flameoff 2s ease-in-out 2.34s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(26) {
  animation: flameoff 4s ease-in-out 2.34s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(27) {
  animation: flameone 3s ease-in-out 2.43s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(27) {
  animation: flametwo 3s ease-in 2.43s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(27) {
  animation: flamethree 3s ease 2.43s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(27) {
  animation: flamefour 1s ease-out 2.43s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(27) {
  animation: flameoff 3s ease-in-out 2.43s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(27) {
  animation: flameoff 4s ease-in-out 2.43s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(27) {
  animation: flameoff 4s ease-in-out 2.43s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(27) {
  animation: flameoff 5s ease-in-out 2.43s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(28) {
  animation: flameone 1s ease-in-out 2.52s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(28) {
  animation: flametwo 3s ease-in 2.52s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(28) {
  animation: flamethree 1s ease 2.52s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(28) {
  animation: flamefour 3s ease-out 2.52s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(28) {
  animation: flameoff 2s ease-in-out 2.52s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(28) {
  animation: flameoff 4s ease-in-out 2.52s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(28) {
  animation: flameoff 1s ease-in-out 2.52s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(28) {
  animation: flameoff 5s ease-in-out 2.52s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(29) {
  animation: flameone 2s ease-in-out 2.61s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(29) {
  animation: flametwo 3s ease-in 2.61s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(29) {
  animation: flamethree 2s ease 2.61s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(29) {
  animation: flamefour 2s ease-out 2.61s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(29) {
  animation: flameoff 3s ease-in-out 2.61s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(29) {
  animation: flameoff 5s ease-in-out 2.61s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(29) {
  animation: flameoff 5s ease-in-out 2.61s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(29) {
  animation: flameoff 3s ease-in-out 2.61s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(30) {
  animation: flameone 3s ease-in-out 2.7s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(30) {
  animation: flametwo 3s ease-in 2.7s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(30) {
  animation: flamethree 1s ease 2.7s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(30) {
  animation: flamefour 2s ease-out 2.7s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(30) {
  animation: flameoff 2s ease-in-out 2.7s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(30) {
  animation: flameoff 5s ease-in-out 2.7s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(30) {
  animation: flameoff 3s ease-in-out 2.7s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(30) {
  animation: flameoff 3s ease-in-out 2.7s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(31) {
  animation: flameone 1s ease-in-out 2.79s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(31) {
  animation: flametwo 3s ease-in 2.79s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(31) {
  animation: flamethree 3s ease 2.79s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(31) {
  animation: flamefour 1s ease-out 2.79s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(31) {
  animation: flameoff 2s ease-in-out 2.79s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(31) {
  animation: flameoff 4s ease-in-out 2.79s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(31) {
  animation: flameoff 4s ease-in-out 2.79s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(31) {
  animation: flameoff 4s ease-in-out 2.79s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(32) {
  animation: flameone 3s ease-in-out 2.88s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(32) {
  animation: flametwo 3s ease-in 2.88s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(32) {
  animation: flamethree 3s ease 2.88s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(32) {
  animation: flamefour 3s ease-out 2.88s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(32) {
  animation: flameoff 4s ease-in-out 2.88s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(32) {
  animation: flameoff 2s ease-in-out 2.88s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(32) {
  animation: flameoff 3s ease-in-out 2.88s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(32) {
  animation: flameoff 5s ease-in-out 2.88s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(33) {
  animation: flameone 2s ease-in-out 2.97s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(33) {
  animation: flametwo 2s ease-in 2.97s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(33) {
  animation: flamethree 1s ease 2.97s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(33) {
  animation: flamefour 3s ease-out 2.97s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(33) {
  animation: flameoff 5s ease-in-out 2.97s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(33) {
  animation: flameoff 5s ease-in-out 2.97s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(33) {
  animation: flameoff 5s ease-in-out 2.97s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(33) {
  animation: flameoff 3s ease-in-out 2.97s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(34) {
  animation: flameone 2s ease-in-out 3.06s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(34) {
  animation: flametwo 3s ease-in 3.06s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(34) {
  animation: flamethree 1s ease 3.06s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(34) {
  animation: flamefour 2s ease-out 3.06s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(34) {
  animation: flameoff 1s ease-in-out 3.06s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(34) {
  animation: flameoff 4s ease-in-out 3.06s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(34) {
  animation: flameoff 3s ease-in-out 3.06s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(34) {
  animation: flameoff 1s ease-in-out 3.06s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(35) {
  animation: flameone 3s ease-in-out 3.15s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(35) {
  animation: flametwo 3s ease-in 3.15s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(35) {
  animation: flamethree 2s ease 3.15s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(35) {
  animation: flamefour 2s ease-out 3.15s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(35) {
  animation: flameoff 3s ease-in-out 3.15s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(35) {
  animation: flameoff 1s ease-in-out 3.15s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(35) {
  animation: flameoff 1s ease-in-out 3.15s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(35) {
  animation: flameoff 5s ease-in-out 3.15s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(36) {
  animation: flameone 1s ease-in-out 3.24s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(36) {
  animation: flametwo 1s ease-in 3.24s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(36) {
  animation: flamethree 1s ease 3.24s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(36) {
  animation: flamefour 2s ease-out 3.24s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(36) {
  animation: flameoff 5s ease-in-out 3.24s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(36) {
  animation: flameoff 3s ease-in-out 3.24s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(36) {
  animation: flameoff 4s ease-in-out 3.24s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(36) {
  animation: flameoff 5s ease-in-out 3.24s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(37) {
  animation: flameone 1s ease-in-out 3.33s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(37) {
  animation: flametwo 2s ease-in 3.33s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(37) {
  animation: flamethree 2s ease 3.33s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(37) {
  animation: flamefour 3s ease-out 3.33s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(37) {
  animation: flameoff 3s ease-in-out 3.33s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(37) {
  animation: flameoff 4s ease-in-out 3.33s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(37) {
  animation: flameoff 4s ease-in-out 3.33s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(37) {
  animation: flameoff 5s ease-in-out 3.33s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(38) {
  animation: flameone 2s ease-in-out 3.42s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(38) {
  animation: flametwo 1s ease-in 3.42s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(38) {
  animation: flamethree 2s ease 3.42s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(38) {
  animation: flamefour 2s ease-out 3.42s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(38) {
  animation: flameoff 1s ease-in-out 3.42s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(38) {
  animation: flameoff 2s ease-in-out 3.42s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(38) {
  animation: flameoff 4s ease-in-out 3.42s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(38) {
  animation: flameoff 5s ease-in-out 3.42s infinite;
}

.fireCont:nth-child(1) .fire:nth-child(39) {
  animation: flameone 1s ease-in-out 3.51s infinite alternate;
}

.fireCont:nth-child(2) .fire:nth-child(39) {
  animation: flametwo 3s ease-in 3.51s infinite alternate;
}

.fireCont:nth-child(3) .fire:nth-child(39) {
  animation: flamethree 1s ease 3.51s infinite alternate;
}

.fireCont:nth-child(4) .fire:nth-child(39) {
  animation: flamefour 2s ease-out 3.51s infinite alternate;
}

.firetap:nth-child(5) .firetip:nth-child(39) {
  animation: flameoff 2s ease-in-out 3.51s infinite;
}

.firetap:nth-child(6) .firetip:nth-child(39) {
  animation: flameoff 5s ease-in-out 3.51s infinite;
}

.firetap:nth-child(7) .firetip:nth-child(39) {
  animation: flameoff 4s ease-in-out 3.51s infinite;
}

.firetap:nth-child(8) .firetip:nth-child(39) {
  animation: flameoff 2s ease-in-out 3.51s infinite;
}

@keyframes flameone {
  to {
    height: 120%;
  }
}
@keyframes flametwo {
  to {
    height: 90%;
  }
}
@keyframes flamethree {
  to {
    height: 110%;
  }
}
@keyframes flamefour {
  to {
    height: 80%;
  }
}
@keyframes flameoff {
  0% {
    opacity: 0;
    transform: translateY(0px) scale(0.7, 0.7);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(0.1, 0.1);
  }
}
</style>