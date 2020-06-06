<template>
  <div id="register" :style="bgphoto">
    <div class="tit">账号注册</div>
    <form>
      <input
        class="myname"
        type="text"
        name="username"
        id="username"
        v-model="registerData.username"
        placeholder="用户名..."
      />
      <input
        class="pwd"
        type="password"
        name="userpwd"
        id="userpwd"
        v-model="registerData.userpwd"
        placeholder="密码..."
      />
      <input @click="register" type="text" class="zc" value="注册" />
    </form>
    <router-link to="/login">
      <div class="zhuce">立即登录</div>
    </router-link>
  </div>
</template>
<script>
import $ from "jquery";
import Axios from "axios";
import qs from "qs";
export default {
  name: "register",
  data() {
    return {
      msg: [],
      registerData: {
        userpwd: "",
        username: ""
      },
      userinfo: [],
      bgphoto: {
        height: $(window).height() + "px",
        width: $(window).width() + "px"
      }
    };
  },
  methods: {
    register: function() {
      var data = {
        username: this.registerData.username,
        password: this.registerData.userpwd
      };
      console.log(data);

      var pwds = $(".pwd").val();
      var name = $(".myname").val();
      var reg = /^[0-9a-zA-Z]+$/;
      if (name.length != 0 && pwds.length != 0) {
        if (name.match(reg)) {
          Axios.post(
            "http://182.92.194.165:8081/user/register",
            qs.stringify(data),
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
          )
            .then(res => {
              console.log(res);
              alert("用户注册成功，请前去登录！");
              this.registerData.userpwd = "";
              this.registerData.username = "";
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          alert("用户名为数字或字母");
          this.registerData.userpwd = "";
          this.registerData.username = "";
        }
      } else {
        console.log("账号或者密码不能为空");
      }
    }
  }
};
</script>
<style >
#register {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
  background: #34495e;
  box-shadow: 15px 21px 76px rgb(94, 94, 94);
  overflow: hidden;
  border-radius: 22px;
 
}
#register form {
  width: 300px;
  height: 312px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
#register  input {
   width: 200px;
  height: 40px;
  margin-top: 2rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  padding-left: 1rem;
  background: none;
  color: #fff;
  }
#register input::placeholder {
  color: #fff;
  font-size: 15px;
}
.zc {
  display: inline-block;
  width: 200px;
  height: 40px;
  text-align: center;
  outline: none;
  line-height: 40px;
  border:1px solid #fff !important;
  border-radius: 20px;
  margin-top: 2rem;
  letter-spacing: 5px;
  background: none;
  cursor: pointer;
  color: #fff;
}
.zhuce{
  display: inline-block;
  width: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 25px;
  margin-top: 50px;
  background: rgb(209, 27, 63);
  color: rgba(236, 229, 229, 0.568);
}
.tit {
  font-size: 1.4rem;
  text-align: center;
}
</style>