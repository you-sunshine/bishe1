<template>
  <div id="addsetting">
    <div class="addtit">
      <i class="el-icon-arrow-left" @click="goback"></i>
      添加设备
    </div>
    <div class="commdaylist">
      <div class="leftlist">
        <ul class="l_menu">
          <li
            :class="{colorblue:active==index}" 
            @click=" changbgs(index,index), listTop(index) "
            v-for="(item,index) in devicesclass"
            :key="index"
          >{{item.classChName}}</li>
        </ul>
      </div>
      <div class="rightlist">
        <ul class="r_menu">
          <li class="everytype" v-for="(item,index) in devicesclass " :key="index">
            <div class="t_title">{{item.classChName}}</div>
            <div class="food_list">
              <div
                class="de_list"
                @click="addseting(index0)"
                v-for="(item0,index0) in devicelist"
                :key="index0"
                v-if="item.classId==item0.classId"
              >
                <div>
                  <img :src="item0.imgSrc " alt />
                  <p>{{item0.deviceChName}}</p>
                </div>
                <div></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import $ from "jquery";
import { mapGetters } from "vuex";
import Storage from "../../storage/storage";
import qs from "qs";
export default {
  name: "addsetting",
  data() {
    return {
      devicesclass: [],
      devicelist: [],
      setting: [],
      allset: [],
      active:"",
      
    };
  },
  methods: {
    goback() {
      history.go(-1);
      //   this.$router.back(-1);
    },
    changbgs(number,type) {
      this.active=number;
     
    },
    listTop(index) {
      let that = this;
      $(".r_menu").animate(
        {
          scrollTop: that.listheight(index) + 1
        },
        200
      );
    },
    listheight(index) {
      if (index < 0) {
        return 0;
      }
      let count = 0;
      for (let i = 0; i < index; i++) {
        count += $(".everytype")
          .eq(i)
          .height();
      }
      return count;
    },
    addseting(index0) {
      // 获取要添加的家居的信息
      var device = this.devicelist[index0];

      var givedevice = {};

      var userId = this.$store.state.username.userId;
      device.userId = userId;

      givedevice.userId = userId;
      givedevice.cusId = 2;
      givedevice.deviceId = device.deviceId;
      givedevice.operation = device.deviceState;

      this.setting = device;
      this.setting.isAdd = true;
      // this.$store.dispatch("insertcart", this.setting);

      Axios.post(
        "http://182.92.194.165:8081/operate/customization/cusSceneAdd",
        qs.stringify(givedevice),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      )
        .then(res => {
          console.log(res);
          
          alert("添加设备成功！")
        })
        .catch(function(err) {
          console.log(err);
        });

      if (this.setting.isAdd) {
        return;
      } else {
        this.setting.isAdd = true;
        // this.$store.dispatch("insertcart", this.setting);
      }
    }
  },
  mounted() {
    Axios.get("http://182.92.194.165:8089/deviceclass/list").then(res => {
      // 获取设备类型表
      this.devicesclass = res.data.detail;
    });

    Axios.get("http://182.92.194.165:8089/device/list").then(res => {
      this.devicelist = res.data.detail;
      console.log(this.devicelist);
    });
     
    let oft =  $(".addtit").height();
    let win_w = $(window).height();
    $(".leftlist").height(win_w - oft);
    $(".rightlist").height(win_w - oft);
  }
};
</script>
<style >
#addsetting {
background-image: linear-gradient(132deg, #a8edea 0%, #fed6e3 100%);
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
.seacrhput {
  width: 100%;
  height: 40px;
}

.commdaylist {
  position: relative;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.commdaylist > div:nth-child(1) {
  flex: 1;
  overflow: hidden;
}
.l_menu {
  height: 100%;
  width: 110%;
  overflow-y: scroll;
  text-align: left;
}
.l_menu li {
  position: relative;
  font-size: 1rem;
  width: 95%;
  /* color:grey; */
  height: 45px;
  line-height: 35px;
  padding: 0.5rem 0;
  text-align: center;
}
.commdaylist > div:nth-child(2) {
  flex: 3;
  overflow: hidden;
  overflow-y: scroll;
  border-left: 1px solid rgb(204, 204, 204);
}
.r_menu {
  height: 100%;
  width: 110%;
  overflow-y: scroll;
  text-align: left;
}
.r_menu li {
  position: relative;
  width: 100%;
  text-align: center;
}
.t_title {
  width: 100%;
  padding: 0.7rem 0.5rem;
  font-size: 1.1rem;
  text-align: left;
  letter-spacing: 0.1rem;
}

.minibanner {
  width: 100%;
  height: 65px;
}
.minibanner img {
  width: 82%;
  height: 59px !important;
  margin-top: 3px;
  margin-left: -1.5rem;
  border-radius: 4rem;
  background: pink;
}
.food_list {
  width: 94%;
  overflow: hidden;
}
.de_list {
  width: 33.3%;
  height: 90px;
  float: left;
  text-align: center;
}
.de_list img {
  width: 55px;
  height: 55px;
  margin: 0.6rem 0 0.1rem;
}
.de_list p {
  font-size: 0.8rem;
}
.colorblue {
  color: rgb(47, 135, 235);
}
.showNo {
  display: none;
}

</style>