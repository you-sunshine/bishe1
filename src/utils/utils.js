import Axios from 'axios'
import qs from 'qs';
const utils = {
    axiosMethod: (config) => {
        Axios({
            method: config.method,
            url: config.url,
            params: config.params ? config.params : null,
            data: config.data ? config.data : null,
        }).then(config.callback).catch(config.catch ? config.catch : () => {
            alert("登录失败，请确认你的用户信息")

        })
    },
    stringToByte(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;


    },
    Openlight(senddata) {
        Axios({
                method: "POST",
                url: "http://182.92.194.165:8081/operate/customization/cusSceneUpdata",
                data: qs.stringify(senddata),
                dataType: "json",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(res => {
                // console.log(res);

            })
            .catch(function(err) {
                console.log(err);
            });
    },
    Changelight(senddata) {
        Axios({
                method: "POST",
                url: "http://182.92.194.165:8081/operate/device/updatelampcolor",
                data: qs.stringify(senddata),
                dataType: "json",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(res => {
                // console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    ChangeVloume(geturl, getdata) {
        Axios({
                method: "post",
                url: geturl,
                data: qs.stringify(getdata),
                dataType: "json",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(res => {
                console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            });
    },

    ChangeCurtain(senddata) {
        Axios({
                method: "POST",
                url: "http://182.92.194.165:8081/operate/device/updatecur",
                data: qs.stringify(senddata),
                dataType: "json",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(res => {
                // console.log(res);

            })
            .catch(function(err) {
                console.log(err);
            });
    },
    ChangeAir(senddata) {
        Axios({
                method: "POST",
                url: "http://182.92.194.165:8081/operate/device/updateclear",
                data: qs.stringify(senddata),
                dataType: "json",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(res => {
                // console.log(res);

            })
            .catch(function(err) {
                console.log(err);
            });
    },


}
export default utils