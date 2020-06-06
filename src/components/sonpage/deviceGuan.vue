<template>
  <div id="deviceGuan" :style="bgphoto2">
    <div class="d_title">
      <i class="el-icon-arrow-left" @click="returnhome"></i>
      <span class="set_name">设备状态</span>
    </div>
    <table border="1">
      <tr>
        <th>设备</th>
        <th>运行状态</th>
        <th>运行模式</th>
        <th>当前音量</th>
        <th>当前节目</th>
      </tr>
      <tr   v-for="(item,index) in devicestates"
            :key="index">
        <td>{{item.deviceName}}</td>
        <td>{{item.deviceState}}</td>
        <td  v-if="item.deviceId==10">{{item.curtainStatus}}</td>
        <td  v-if="item.deviceId==5">{{item.cleanerStatus}}</td>
        <td  v-else>{{item.lampState}}</td>
        <td>{{item.dateValue}}</td>
        <td>{{item.programValue}}</td>
      </tr>
    
    </table>
  </div>
</template>


<script>
import Axios from "axios";
import qs from "qs";
import getTemper from "../../utils/getTemper";
import $ from "jquery";
export default {
  name: "deviceGuan",
  data() {
    return {
      devicestates: [],
      bgphoto2: {
        height: $(window).height() + "px",
        width: $(window).width() + "px",
        backgroundImage:
          " linear-gradient(0deg, #FFDEE9 20%, #B5FFFC 70%, #ffffff 100%)"
      }
    };
  },
  methods: {
    returnhome() {
      history.go(-1);
    }
  },
  mounted() {
    var userid = this.$store.state.username.userId;
    var data = {
      userId: userid
    };
    Axios({
      method: "GET",
      url: "http://182.92.194.165:8081/operate/device/querydate", //获取设备状态
      params: data,
      dataType: "json",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(res => {
        // console.log(res.data.data.detailDates);
        this.devicestates = res.data.data.detailDates;
        for(let i=0;i<this.devicestates.length;i++){
          if(this.devicestates[i].deviceId==1){
            this.devicestates[i].deviceName="欧式吸顶灯";
            this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
          else if(this.devicestates[i].deviceId==2){
            this.devicestates[i].deviceName="玄关智能灯带";
            this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
           else if(this.devicestates[i].deviceId==3){
            this.devicestates[i].deviceName="卧室照明灯";
            this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
  
          }
           else if(this.devicestates[i].deviceId==4){
            this.devicestates[i].deviceName="空调";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
           else if(this.devicestates[i].deviceId==5){
            this.devicestates[i].deviceName="净水器";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
           else if(this.devicestates[i].deviceId==6){
            this.devicestates[i].deviceName="5G路由器";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
           else if(this.devicestates[i].deviceId==7){
            this.devicestates[i].deviceName="智慧电视";
            
          }
           else if(this.devicestates[i].deviceId==8){
            this.devicestates[i].deviceName="智能音响";
            
          }
           else if(this.devicestates[i].deviceId==9){
            this.devicestates[i].deviceName="扫地机器人";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
           else if(this.devicestates[i].deviceId==10){
            this.devicestates[i].deviceName="电动窗帘";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
            else if(this.devicestates[i].deviceId==12){
            this.devicestates[i].deviceName="烟雾传感器";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
           else if(this.devicestates[i].deviceId==13){
            this.devicestates[i].deviceName="温湿度传感器";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
           else if(this.devicestates[i].deviceId==15){
            this.devicestates[i].deviceName="智能门窗";
               this.devicestates[i].dateValue="";
            this.devicestates[i].programValue="";
          }
        }
        console.log(this.devicestates);
        
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>
<style >
.d_title {
  width: 100%;
  height: 55px;
  background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);
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

table {
  border-collapse: collapse;
  margin: 0px auto;
  text-align: center;
  width: 100%;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}

table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}

tr {
  background-color: white;
}
</style>