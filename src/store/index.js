import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		item: [{
				task: "task 1",
				desc: "desc 1",
				priority: "hight",
				assign: "Julio",
				date: "12/12/2020",
				status: "todo"
			},
			{
				task: "task 2",
				desc: "desc 2",
				priority: "medium",
				assign: "Louis",
				date: "11/11/2020",
				status: "in-progress"
			}
		],
		priority: ["hight", "medium", "low"],
		user: ["Julio", "Louis", "CF", "Julian"]
	},
	mutations: {
		// increment(state) {
		// 	state.data++;
		// }
		ADD_ITEM(state, payload) {
			state.item.push(payload);
		},
		REMOVE_ITEM(state, id) {
			state.item.splice(id, 1);
		}
	},
	actions: {},
	modules: {}
});