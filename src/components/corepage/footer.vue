<template>
  <div id="foot">
    <div class="f_model" @click="changecolor(index)" v-for="(item,index) in footdata" :key="index">
      <router-link :to="item.action">
        <i :class="item.classname0" :id="`${item.isuser?'f_btnb' :'f_btng'}`"></i>
        <p :class="{'fontcolor':item.isuser,'fontgrey':!item.isuser}">{{item.name}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "foot",
  data() {
    return {
      footdata: [
        {
          name: "首页",
          classname0: "el-icon-s-home",
          action: "/index",
          isuser: true
        },
        {
          name: "场景",
          classname0: "el-icon-set-up",
          action: "/type",
          isuser: false
        },
        {
          name: "我的",
          classname0: "el-icon-s-custom",
          action: "/my",
          isuser: false
        }
      ]
    };
  },
  methods: {
    changecolor(index) {
      this.footdata.map((val, key) => {
        val.isuser = false;
      });
      this.footdata[index].isuser = true;
    }
  }
};
</script>
<style>
#foot {
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  flex-direction: row;
  /* border-radius: 15px 15px 5px 5px; */
 background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
}
.f_model {
  flex: 1;
  text-align: center;
  font-size: 0.7rem;
}
#f_btnb {
  width: 30px;
  height: 30px;
  padding-top: 5px;
  font-size: 1.6rem;
  color: rgb(103, 185, 252);
}
#f_btng {
  width: 30px;
  height: 30px;
  padding-top: 5px;
  font-size: 1.6rem;
  color: grey;
}
.f_model p {
  font-size: 0.9rem;
}
.fontcolor {
  color: rgb(103, 185, 252);
}
.fontgrey {
  color: grey;
}
</style>