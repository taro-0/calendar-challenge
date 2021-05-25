import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
  },
  mutations: {
    addEvent(state, event) {
      state.events.push(event);
    },
    removeEvent(state, index) {
      state.events.splice(index, 1);
    },
    setEvents(state, events) {
      state.events = events;
    },
  },
  actions: {
    addEvent({ commit, state }, event) {
      commit("addEvent", {
        ...event,
        index: state.events.length,
      });
    },
    updateEvent({ commit, state }, { index, ...event }) {
      let events = Array.from(state.events);

      events[index] = event;
      commit("setEvents", events);
    },
    removeEvent({ commit }, index) {
      commit("removeEvent", index);
    },
  },
  modules: {},
});
