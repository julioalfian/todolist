import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		item: [{
				task: "Task Title",
				desc: "Task Description",
				priority: "hight",
				assign: "Julio",
				date: "2020-12-12",
				status: "todo"
			},
			{
				task: "Task Title 2",
				desc: "Task Description 2",
				priority: "medium",
				assign: "Julio",
				date: "2020-11-11",
				status: "in-progress"
			}
		],
		priority: ["hight", "medium", "low"],
		user: ["Julio", "Louis", "CF", "Julian"]
	},
	mutations: {
		ADD_ITEM(state, payload) {
			state.item.push(payload);
		},
		REMOVE_ITEM(state, id) {
			state.item.splice(id, 1);
		},
		UPDATE_ITEM(state, payload) {
			console.log(payload);
			const newItem = {
				task: payload.task,
				desc: payload.desc,
				priority: payload.priority,
				assign: payload.assign,
				date: payload.date,
				status: payload.status
			};
			state.item[payload.indexItem] = newItem;
		}
	},
	actions: {},
	modules: {}
});