<template>
  <div id="changPwd" :style="bgphoto2">
    <div class="Xg_pwd">
      <i class="el-icon-arrow-left" @click="returnhome"></i>
      <span>修改密码</span>
    </div>
    <div class="chang_p">
      <input class="u_name" type="text" v-model="username" placeholder="请输入用户名..." />
      <input class="u_npwd" type="text" v-model="userNpwd" placeholder="请输入新密码..." />
      <div class="container">
        <button @click="QueDing" class="queding">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import qs from "qs";
import $ from "jquery";
export default {
  name: "changPwd",
  data() {
    return {
      username: "",
      userNpwd: "",
      bgphoto2: {
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
      var userNpwd = this.userNpwd;
      var data = {
        username: this.username,
        password: this.userNpwd
      };

      Axios.post(
        "http://182.92.194.165:8081/user/changePassword",
        qs.stringify(data),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      )
        .then(response => {
          console.log(response);
          if (this.username!==""&&this.userNpwd!=="") {
            this.$router.push({
              path: "/login"
            });
          }
          else{
             alert("账号密码不能为空")
          }
        })
        .catch(error => {
          alert("出错了！");
        });
      /*   Axios({
        method: "post",
        url:"http://182.92.194.165:8081/user/changPassword",
        data:data
      })
        .then(res => {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        }); */
    }
  }
};
</script>
<style >
#changPwd {
  background-image: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
}
.Xg_pwd {
  height: 60px;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  background-image: linear-gradient(-55deg, #e6add6ce 0%, #fef9d7 100%);
}
.Xg_pwd i {
  font-size: 2.1rem;
  align-items: center;
  padding: 0 10px;
}
.Xg_pwd span {
  display: inline-block;
  flex: 1;
  padding-left: 28%;
  font-size: 1.1rem;
  background: linear-gradient(to right, #d62b8f, #171818);
  -webkit-background-clip: text;
  color: transparent;
}
.chang_p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.u_name,
.u_npwd {
  width: 50%;
  height: 55px;
  margin-top: 2rem;
  border: 1px solid gainsboro;
  border-radius: 30px;
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
.queding {
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