import Axios from 'axios';
export default async function getTemper() {
    var data = {
        tem: "",
        hum: ""
    };
    await Axios.get("http://182.92.194.165:8081/humiture/findAll")
        .then(res => {
            data.tem = res.data[0].temperature;
            data.hum = res.data[0].humidity;
        })
        .catch(function(err) {
            console.log(err);
        });
    return data
}