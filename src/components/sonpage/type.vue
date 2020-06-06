<template>
  <div id="type" :style="bgphoto">
    <div class="tui">
      <span class="tlt">推荐</span>
    </div>
    <div class="model">
      <router-link to="/leave" class="chang">
        <span>安心离家</span>
        <div>
          <img src="static/img/1.png" alt />
        </div>
      </router-link>
    </div>
    <div class="model">
      <router-link to="/gohome" class="chang">
        <span>温馨回家</span>
        <div>
          <img src="static/img/7.png" alt />
        </div>
      </router-link>
    </div>
    <div class="model">
      <router-link to="/save" class="chang">
        <span>一键关灯</span>
        <div>
          <img src="static/img/6.png" alt />
        </div>
      </router-link>
    </div>
   
  </div>
</template>
<script>
var boxes = document.querySelectorAll('#boxes > div');
  [].forEach.call(boxes, box => {
    box.addEventListener('mousemove', e => {
      document.body.style.setProperty(
        '--bg-color',
        box.style.getPropertyValue('--color')
      );

      var size = parseInt(getComputedStyle(box).width);
      
      // scaling
      var x = size * .3 * .7 + .7 * e.offsetX;
      var y = size * .3 * .7 + .7 * e.offsetY;
      
      box.style.setProperty('--x', x);
      box.style.setProperty('--y', y);
      box.style.setProperty('--size', size);
    });
  });
  </script>

<script>
import  $ from 'jquery'
export default {
  name: "type",
  data() {
    return {
      bgphoto: {
        height: $(window).height() + "px",
        width: $(window).width()-30 + "px"
      }
    };
  }
};
</script>
<style >
#type {
  padding: 0.5rem 15px;
  margin-bottom: 66px; 
  background-image: linear-gradient(-50deg, #ace0f9 0%, #fff1eb 100%)

}
.tui {
  height: 35px;
  font-size: 1.2rem;
  padding-top: 0.5rem;
}

.tui span {
  display: inline-block;
  color: rgb(67, 144, 245);
  border-radius: 20px;
  letter-spacing: 0.1rem;
}

.tlt:after {
  content: "";
  position: absolute;
  width: 25px;
  height: 1px;
  background: rgb(67, 144, 245);
  top: 46px;
  left: 20px;
}
.model {
  margin: 0.8rem 0;
}
.model span {
  position: absolute;
  height: 30px;
  line-height: 30px;
  background: rgb(239, 242, 245);
  margin: 0.5rem;
  padding: 0.2rem;
  z-index: 1;
  background: rgba(139, 137, 137, 0.575);
  font-size: 1.1rem;
  color: #fff;
  border-radius: 0.5rem;
}
.model div {
  width: 100%;
  height: 120px;
}
.model div img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}


</style>