import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedForDelete: [],
    brand: [],
    detail: [],
    color: [],
    trend: [],
    trendCollection: [],
    store: []
  },
  mutations: {
    setSelectedForDelete: (state, id) => {
      state.selectedForDelete.push(id);
    },
    setBrand: (state, brand) => {
      state.brand = brand;
    },
    setDetail: (state, detail) => {
      state.detail = detail;
    },
    setColor: (state, color) => {
      state.color = color;
    },
    setTrendCollection: (state, trendCollection) => {
      state.trendCollection = trendCollection;
    },
    setTrend: (state, trend) => {
      state.trend = trend;
    },
    setStore: (state, store) => {
      state.store = store;
    }
  },
  actions: {
    setSelectedForDelete: ({ commit }, id) => {
      commit("setSelectedForDelete", id);
    },
    setBrand: ({ commit }, brand) => {
      commit("setBrand", brand);
    },
    setDetail: ({ commit }, detail) => {
      commit("setDetail", detail);
    },
    setColor: ({ commit }, color) => {
      commit("setColor", color);
    },
    setTrendCollection: ({ commit }, trendCollection) => {
      commit("setTrendCollection", trendCollection);
    },
    setTrend: ({ commit }, trend) => {
      commit("setTrend", trend);
    },
    setStore: ({ commit }, store) => {
      commit("setStore", store);
    }
  },
  getters: {
    getSelectedForDelete: state => {
      return state.selectedForDelete;
    },
    getBrand: state => {
      return state.brand;
    },
    getDetail: state => {
      return state.detail;
    },
    getColor: state => {
      return state.color;
    },
    getTrendCollection: state => {
      return state.trendCollection;
    },
    getTrend: state => {
      return state.trend;
    },
    getStore: state => {
      return state.store;
    }
  }
});
