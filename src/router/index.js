// 配置外部文件路由
import Vue from 'vue';
import vuerouter from 'vue-router';
// 引入组件模板
import Content from '../components/corepage/content'
import First from '../components/sonpage/index'
import Type from '../components/sonpage/type'
import My from '../components/sonpage/my'
import Add from '../components/corepage/addsetting'
import Login from "../components/sonpage/login"
import Register from '../components/sonpage/register'
import Myset from '../components/sonpage/myset'
import deviceGuan from '../components/sonpage/deviceGuan'


import Lantern1 from '../components/functionPage/Lantern1'
import Lantern2 from '../components/functionPage/Lantern2'
import Lantern3 from '../components/functionPage/Lantern3'
import Aircondition from '../components/functionPage/Aircondition'
import Airpurify from '../components/functionPage/Airpurify'
import Luyou from '../components/functionPage/Luyou'
import TV from '../components/functionPage/TV'
import Song from '../components/functionPage/Song'
import SweepFloor from '../components/functionPage/SweepFloor'
import ElectircCurtain from '../components/functionPage/ElectricCurtain'
import GasSensor from '../components/functionPage/GasSensor'
import SmokeSensor from '../components/functionPage/SmokeTransducer'
import Windows from '../components/functionPage/Windows'
import ChangPwd from '../components/detailpage/changPwd'
import ForgetPwd from '../components/detailpage/forgetPwd'

import Leave from '../components/sonpage/CusScene/leave'
import GoHome from '../components/sonpage/CusScene/goHome'
import Save from '../components/sonpage/CusScene/save'

let head = document.getElementsByTagName('head');
let meta = document.createElement('meta');
meta.name = 'referrer';
//根据实际情况修改referrer的值，可选值参考上文
meta.content = 'no-referrer';
head[0].appendChild(meta);

let route = new vuerouter({
    mode: "hash",
    // 配置路由
    routes: [{
            path: '/',
            redirect: '/index',
        },
        {
            path: "/index",
            component: Content,
            name: "Content",
            children: [{
                    path: "/index",
                    component: First,
                    name: "First",
                },
                {
                    path: "/type",
                    component: Type,
                    name: "Type",

                },
                {
                    path: "/my",
                    component: My,
                    name: "My"
                },

            ]
        },

        {
            path: "/leave",
            component: Leave,
            name: "Leave",
        },
        {
            path: "/gohome",
            component: GoHome,
            name: "GoHome",
        },
        {
            path: "/save",
            component: Save,
            name: "Save",
        },
        {
            path: "/add",
            component: Add,
            name: "Add"
        },
        {
            //登录
            path: '/login',
            component: Login,
            meta: {
                isLogin: false
            }
        },
        {
            //注册
            path: '/register',
            component: Register,
        },
        /*  {
             path: '*', //其他页面，强制跳转到登录页面
             redirect: '/login'
         }, */
        {
            path: "/myset",
            component: Myset,
            name: "Myset",
        },
        {
            path: "/deviceguan",
            component: deviceGuan,
            name: "deviceGuan",
        },
        {
            path: '/den1',
            component: Lantern1
        },
        {
            path: '/den2',
            component: Lantern2
        },
        {
            path: '/den3',
            component: Lantern3
        },
        {
            path: '/kong1',
            component: Aircondition
        },
        {
            path: '/kong2',
            component: Airpurify
        },
        {
            path: '/luyou',
            component: Luyou
        },
        {
            path: '/tv',
            component: TV
        },
        {
            path: '/song',
            component: Song
        },
        {
            path: "/clear",
            component: SweepFloor
        },
        {
            path: "/curtain",
            component: ElectircCurtain
        },

        {
            path: "/yangan",
            component: SmokeSensor
        },
        {
            path: "/meigan",
            component: GasSensor
        },

        {
            path: "/window",
            component: Windows
        },
        {
            path: '/changPwd',
            component: ChangPwd
        },
        {
            path: '/forgetPwd',
            component: ForgetPwd
        }


    ]
})
Vue.use(vuerouter);
export default route;