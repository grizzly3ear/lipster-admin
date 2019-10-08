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
    store: [],
    storeAddress: [],
    breadcrumbs: []
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
    },
    setStoreAddress: (state, storeAddress) => {
      state.storeAddress = storeAddress;
    },
    setBreadcrumbs: (state, breadcrumbs) => {
      state.breadcrumbs = breadcrumbs;
    },
    pushBreadcrumb: (state, breadcrumb) => {
      state.breadcrumbs.push(breadcrumb);
    },
    popBreadcrumb: state => {
      state.breadcrumbs.pop();
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
    },
    setStoreAddress: ({ commit }, storeAddress) => {
      commit("setStoreAddress", storeAddress);
    },
    setBreadcrumbs: ({ commit }, breadcrumbs) => {
      commit("setBreadcrumbs", breadcrumbs);
    },
    pushBreadcrumb: ({ commit }, breadcrumb) => {
      commit("pushBreadcrumb", breadcrumb);
    },
    popBreadcrumb: ({ commit }) => {
      commit("popBreadcrumb");
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
    },
    getStoreAddress: state => {
      return state.storeAddress;
    },
    getBreadcrumbs: state => {
      return state.breadcrumbs;
    }
  }
});
