<template>
  <div id="login" :style="bgphoto">
    <router-link to="/index" class="gohome">返回主页</router-link>
    <h1 class="tit">智能家居系统登录</h1>
    <form>
      <input class="id" type="text" v-model="loginData.username" placeholder="用户名..." />
      <input class="pwd" type="password" v-model="loginData.userpwd" placeholder="密码..." />
      <button @click="mylogin" class="denlu">登录</button>
      <router-link to="/forgetPwd" class="forgetpwd">忘记密码</router-link>
      <router-link to="/register">
        <div class="regist_z">没有账号，立即注册</div>
      </router-link>
    </form>
  </div>
</template>
<script>
import Axios from "axios";
import $ from "jquery";
import qs from "qs";
export default {
  name: "login",
  data() {
    return {
      usermsg: [],
      loginData: {
        userpwd: "",
        username: ""
      },
      bgphoto: {
        height: $(window).height() + "px",
        width: $(window).width() + "px"
      }
    };
  },
  mounted() {
    const con = document.querySelector("#login");
    let isIn = true;
    let isOut = false;
    var span;
    $(".gohome").on("touchstart", function(event) {
      $(this).addClass("gocolor");
      event.stopPropagation();
    });
    $(".gohome").on("touchend", function(event) {
      $(this).removeClass("gocolor");
      event.stopPropagation();
    });
    $(".forgetpwd").on("touchstart", function(event) {
      $(this).addClass("forgetcolor");
      event.stopPropagation();
    });
    $(".forgetpwd").on("touchend", function(event) {
      $(this).removeClass("forgetcolor");
      event.stopPropagation();
    });
    $(".denlu").on("touchmove", function(event) {
      $(this).addClass("den_zhu");
      event.stopPropagation();
    });
    $(".denlu").on("touchend", function(event) {
      $(this).removeClass("den_zhu");
      event.stopPropagation();
    });
    $("#login")
      .children()
      .click(function(e) {
        e.stopPropagation();
      });

    $("#login").on("touchmove ", e => {
      if (isIn) {
        let inx = e.clientX - e.target.offsetLeft;
        let iny = e.clientY - e.target.offsetTop;

        let el = document.createElement("span");
        el.style.left = inx + "px";
        el.style.top = iny + "px";
        con.appendChild(el); //添加到con对应的父元素
        $("#login span").removeClass("out");
        $("#login span").addClass("in");
        span = document.querySelector("#login span");
        isIn = false; //关闭进来的门；
        isOut = true;
      }
    });
    $("#login").on("touchend", e => {
      if (isOut) {
        let inx = e.clientX - e.target.offsetLeft;
        let iny = e.clientY - e.target.offsetTop;
        $("#login span").removeClass("in");
        $("#login span").addClass("out");
        $("out").css("left", inx + "px");
        $("out").css("top", iny + "px");
        isOut = false;
        setTimeout(() => {
          con.removeChild(span); //动画结束，删除元素
          isIn = true;
        }, 500);
      }
    });
  },
  methods: {
    mylogin() {
      var data = this.loginData;
      var params = {
        username: this.loginData.username,
        password: this.loginData.userpwd
      };
      var userdata = encodeURIComponent(JSON.stringify(params), "utf-8");

      Axios.get(
        "http://182.92.194.165:8081/user/login",
        {
          params: params
        },
        { contentType: "application/x-www-form-urlencoded; charset=utf-8" }
      )
        .then(res => {
          let userinfo = res.config.params;
          userinfo.userId = res.data.data.userId;
          if (
            this.loginData.userpwd.length !== 0 &&
            this.loginData.username.length !== 0
          ) {
            // 设置登录后的状态
            this.$store.commit("hiddenMenu");
            let flag = this.$store.state.flag;
            localStorage.setItem("Flag", flag);

            this.$store.dispatch("GetuserName", userinfo);

            console.log("登录成功");
            this.$router.push({
              path: "/index"
            });
          } /* else {
          } */
        })
        .catch(function() {
          alert("账号或密码不能为空,或账号密码错误");
        });
    },
    toReg() {
      this.$router.push({
        path: "register"
      });
    }
  }
};
</script>
<style >
.gohome {
  position: relative;
  top: -117px;
  left: 10px;
  width: 100%;
  height: 30px;
  color: rgb(223, 223, 223);
  z-index: 1;
}
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
  background-image: linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%);
/* background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%); */
/* ; */
  box-shadow: 15px 21px 76px rgb(94, 94, 94);
  overflow: hidden;
  border-radius: 22px;
}
#login form {
  width: 300px;
  height: 312px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
#login form input {
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
#login input::placeholder {
  color: #fff;
  font-size: 15px;
}
.denlu {
  display: inline-block;
  width: 200px;
  height: 40px;
  text-align: center;
  outline: none;
  line-height: 40px;
  margin-top: 2rem;
  border: 1px solid #fff;
  border-radius: 20px;
  letter-spacing: 5px;
  background: none;
  cursor: pointer;
  color: #fff;
}

.regist_z {
  display: inline-block;
  width: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 25px;
  margin-top: 50px;
  background: rgb(202, 27, 4);
  color: rgba(236, 229, 229, 0.568);
}
.den_zhu {
  background: #fff;
  color: #333;
}
.tit {
  z-index: 1;
  margin-bottom: 30px;
  font-size: 30px;
  text-align: center;
  color: #ecf0f1;
  cursor: pointer;
  letter-spacing: 5px;
  font-weight: 100;
  text-shadow: 5px 5px 5px rgba(33, 45, 58, 0.3);
}
.forgetpwd {
  display: inline-block;
  padding-top: 20px;
  margin-left: -130px;
  color: rgb(95, 94, 94);
}
.forgetcolor,
.gocolor {
  color: rgb(218, 39, 39);
}
#login .in {
  position: absolute;
  top: 0;
  left: 0;
  display: black;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: #3498bd;
  transform: translate(-50%, -50%);
  animation: in 0.5s ease-out forwards;
}
#login .out {
  position: absolute;
  top: 0;
  left: 0;
  display: black;
  width: 1200px;
  height: 1200px;
  border-radius: 50%;
  background: #3498bd;
  transform: translate(-50%, -50%);
  animation: out 0.5s ease-out forwards;
}
/* 设置鼠标进入时元素动画 */
@keyframes in {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 2000px;
    height: 2000px;
  }
}
/* 设置鼠标出来时元素动画 */
@keyframes out {
  0% {
    width: 2000px;
    height: 2000px;
  }
  100% {
    width: 0;
    height: 0;
  }
}
</style>