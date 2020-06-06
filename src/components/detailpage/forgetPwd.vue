<template>
  <div id="forgetPwd" :style="bgphoto">
    <div class="w_pwd">
      <i class="el-icon-arrow-left" @click="returnhome"></i>
      <span>忘记密码</span>
    </div>
    <div class="chang_p">
      <input class="u_name" type="text" v-model="username" placeholder="请输入用户名..." />
    <div class="container">
      <button @click="QueDing" class="queding2">确定</button>
    </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Axios from "axios";
export default {
  name: "forgetPwd",
  data() {
    return {
      username: "",
      bgphoto: {
        height: $(window).height() + "px",
        width: $(window).width() + "px"
      }
    };
  },
  methods: {
    returnhome() {
      history.go(-1);
    },
    QueDing() {
      var username = this.username;
      Axios({
        method: "post",
        url: "http://182.92.194.165:8081/user/forgetPassword",
        username: username
      })
        .then(res => {
          this.$router.push({
            path: "/changPwd"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style >
#forgetPwd {
   background-image: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
}
.w_pwd {
  height: 60px;
  background: #fff;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  background-image: linear-gradient(-55deg, #e6add6ce 0%, #fef9d7 100%);
}
.w_pwd i {
  font-size: 2.1rem;
  align-items: center;
  padding: 0 10px;
}
.w_pwd span {
  display: inline-block;
  flex: 1;
  padding-left: 28%;
  font-size: 1.1rem;
  background: linear-gradient(to right, #d62b8f, #171818);
  -webkit-background-clip: text;
  color: transparent;color: grey;
}
.chang_p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.u_name {
  width: 50%;
  height: 50px;
  margin-top: 2rem;
  border: 1px solid gainsboro;
  border-radius: 35px;
  outline: none;
  padding-left: 1rem;
}
.container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
.queding2 {
  font-size: 1.1rem;
  padding: 0.7rem 3rem;
  color: #474747;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid rgb(146, 148, 248);
  position: relative;
  border-radius: 40px;
  overflow: hidden;
  text-align: center;
}
</style>