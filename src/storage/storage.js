var storage={
    //存储
    setStorage(key,val){
        localStorage.setItem(key,JSON.stringify(val))
    },
    // 取出数据
    getStorage(key){
        return JSON.parse(localStorage.getItem(key));
    },
    // 删除数据
    remove(key){
        localStorage.removeItem(key)
    }
}
// 暴露给外部访问
export default storage;