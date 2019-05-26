import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedForDelete: [],
    brand: [],
    detail: [],
    color: [],
    trend: []
  },
  mutations: {
    setSelectedForDelete: (state, id) => {
      state.selectedForDelete.push(id)
    },
    setBrand: (state, brand) => {
      state.brand = brand
    },
    setDetail: (state, detail) => {
      state.detail = detail
    },
    setColor: (state, color) => {
      state.color = color
    },
    setTrend: (state, trend) => {
      state.trend = trend
    }
  },
  actions: {
    setSelectedForDelete: ({commit}, id) => {
      commit('setSelectedForDelete', id)
    },
    setBrand: ({commit}, brand) => {
      commit('setBrand', brand)
    }, 
    setDetail: ({commit}, detail) => {
      commit('setDetail', detail)
    }, 
    setColor: ({commit}, color) => {
      commit('setColor', color)
    },
    setTrend: ({commit}, trend) => {
      commit('setTrend', trend)
    }
  },
  getters: {
    getSelectedForDelete: (state) => {
      return state.selectedForDelete
    },
    getBrand: (state) => {
      return state.brand
    },
    getDetail: (state) => {
      return state.detail
    }, 
    getColor: (state) => {
      return state.color
    },
    getTrend: (state) => {
      return state.trend
    }
  }
})
