import Axios from 'axios'
const truedata = {
    async showdata(senddata, url) {
        var data = {}
        await Axios.get(
                url, {
                    params: senddata
                }, { contentType: "application/x-www-form-urlencoded; charset=utf-8" }
            ).then(res => {
                // console.log(res.data.data);
                data = res.data.data;
            })
            .catch(function(err) {
                console.log(err);
            });
        return data
    }
}
export default truedata