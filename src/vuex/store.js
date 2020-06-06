import Vuex from 'vuex';
import Vue from 'vue'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: localStorage.getItem('states') ? JSON.parse(localStorage.getItem('states')) : {
		flag: false,
		cart: [],
		count: "",
		setflag: false,
		username: "",
		cusid: [],
		userSet: []
	},
	getters: {
		//获取数据的方法 抛出去的数据
		getNum: function (state) {
			return state.count;
		},
		arrcart: function (state) {
			return state.cart;
		},
		
		userName: function (state) {
			return state.username;
		},
		delectCart: function (state) {
			return state.cart
		},
		AddCusid: function (state) {
			return state.cusid
		},
		AdduserSet: function (state) {
			return state.userSet
		},


	},

	mutations: {
		hiddenMenu(state) {
			state.flag = true
		},

		Addsetting(state) {
			state.setflag = true
		},
		Clearsetting(state) {
			state.setflag = false;
		},

		pushcart: function (state, res) {
			let ishas = false;
			let hasindex = 0;
			for (var index in state.cart) {
				if (state.cart[index]['deviceChName'] == res.deviceChName) {
					// console.log(1);
					ishas = true
					return
				}
			}
			if (ishas) {
				state.cart[hasindex] = res;
			}
			else {
				state.cart.push(res);
			}
			// console.log(res);

		},
		
		UserName: function (state, res) {
			state.username = res
			// console.log(res);
		},
		updateCount: function (state) {
			state.count = state.cart.length;
		},
		Popcart: function (state, res) {
			for (let i = 0; i < state.cart.length; i++) {
				if (res.deviceChName == state.cart[i].deviceChName) {
					console.log(1);
					state.cart.splice(i, 1)
				}
			}

		},
		Addcusid: function (state, res) {
			state.cusid = res

		},
		AdduserDevices: function (state, res) {
			state.userSet = res;
		},
	},
	actions: {
		//执行的动作  执行的是上面的mutations
		/* CountAdd: function (content, num) {
			content.commit("updateCount", num);
		}, */
		insertcart: function (content, cart) {
			content.commit("pushcart", cart);
		},
		
		GetuserName: function (content, username) {
			content.commit("UserName", username)
		},
		updateCart: function (content, cart) {
			content.commit("Popcart", cart)
		},
		Add_Cusid: function (content, cusid) {
			content.commit('Addcusid', cusid)
		},
		insertUserSet: function (content, userSet) {
			content.commit('AdduserDevices', userSet)
		},

	}
})
export default store
