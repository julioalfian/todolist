import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    item: [
      {
        task: "task 1",
        desc: "desc 1",
        priority: "hight",
        date: "12/12/2020",
        status: "todo"
      },
      {
        task: "task 2",
        desc: "desc 2",
        priority: "medium",
        date: "11/11/2020",
        status: "in progress"
      }
    ],
    priority: ["hight", "medium", "low"]
  },
  mutations: {
    // increment(state) {
    // 	state.data++;
    // }
    ADD_ITEM(state, payload) {
      state.item.push(payload);
    }
  },
  actions: {},
  modules: {}
});
