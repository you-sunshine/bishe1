<template>
  <div id="weather">
    <div class="search_form">
      <div class="form_group">
        <input type="text" class="input_txt" v-model="city" @keyup.enter="queryWeather" />
        <button class="input_sub" @click="queryWeather">搜 索</button>
      </div>
      <div class="hotkey">
        <a
          href="javascript:;"
          v-for="(item,index) in hotCitys"
          :key="index"
          @click="clickSearch(index, $event)"
        >{{item}}</a>
      </div>
    </div>
    <ul class="weather_list">
      <li
        v-for="(item,index) in forecastList"
        :key="item.date"
        :style="{transitionDelay:index*100+'ms'}"
      >
        <div class="info_type">
          <span class="iconfont">{{ item.type }}</span>
        </div>
        <div class="info_temp">
          {{ item.low.slice(2)}}
          ~
          {{ item.high.slice(2)}}
        </div>
        <div class="info_date">
          <span>{{ item.date }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "weather",
  data() {
    return {
      city: "西安",
      forecastList: [],
      hotCitys: ["西安", "汉中", "北京", "上海"]
    };
  },

  methods: {
    queryWeather() {
      this.forecastList = [];
      axios
        .get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
        .then(res => {
          this.forecastList = res.data.data.forecast;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    clickSearch(index, event) {
      var city = event.currentTarget.innerHTML;
      this.city = city;
      this.queryWeather();
    }
  },
  mounted() {
    $(".hotkey a").click(function() {
      $(this).css("color", "#ffd400");
      $(this)
        .siblings()
        .css("color", "#fff");
    });
  }
};
</script>
<style >
.wrap {
  width: 100%;
}
.search_form {
  width: 100%;
  height: 40px;
}

.form_group {
  height: 40px;
  margin-top: 10px;
}
.input_txt {
  width: 35%;
  height: 30px;
  padding: 0px;
  float: left;
  border: 1px solid #c69eeb;
  outline: none;
  text-indent: 10px;
  border-radius: 20px 0 0 20px; /*左上，右上，右下，左下*/
}

.input_sub {
  width: 60px;
  height: 32px;
  border: 0px;
  float: left;
  background-image: linear-gradient(
    to top,
    #bdc2e8 0%,
    #bdc2e8 1%,
    #db98f3 100%
  );
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  position: relative;
  border-radius: 0 20px 20px 0; /*左上，右上，右下，左下*/
}
.input_sub.loading::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.hotkey {
  position: relative;
  left: 210px;
  top: -34px;
  width:160px;
}

.hotkey a {
  font-size: 14px;
  color: #ffd400;
  padding-left: 10px;
}
.weather_list {
  height: 200px;
  text-align: center;
  margin-top: 0px;
  font-size: 0px;
  display: flex;
  flex-direction: row;
}
.weather_list li {
  flex: 1;
  padding: 0 10px;
  overflow: hidden;
  position: relative;
}
.info_type {
  height: 30px;
}
.info_date {
  width: 100%;
  height: 40px;
  line-height: 20px;
  font-size: 0.6rem;
  left: 0px;
  bottom: 0px;
  color:rgb(206, 97, 82);
  margin-top: 10px;
}

.info_type span {
  color: rgb(241, 134, 134);
  font-size: 0.9rem;
  line-height: 30px;
}
.info_temp {
  font-size: 0.8rem;
  height: 40px;
  color: #cf755a;
}

.tem .iconfont {
  font-size: 50px;
}
</style>
