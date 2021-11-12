import axios from "axios";
import config from "../../config";

export default {
  namespaced: true,
  satate: {
    data: {},
    loading: true,
    modalOpen: false,
    dataForm: {}, // -- State for the New Cursos
    deleteId:null,
  },
  //-- Will modify the state
  mutations: {
    getData(state, payload) {
      state.data = [];
      state.data = payload;
    },
    showLoader(state) {
        state.loading = true
    },
    hideLoader(state) {
        state.loading = false
    },
    getDataForm(state, payload) {
      state.dataForm = payload;
    },
    setDeleteId(state, payload) {
        state.deleteId = payload
    }
  },
  actions: {
    async getData({ commit }) {
      try {
        commit('showLoader')
        const res = await axios.get(config.baseURLApi + `/cursos`);
        commit("getData", res.data);
        console.log(res.data)
        commit('hideLoader')
      } catch (e) {
        this._vm.$toasted.show("Error : " + e, { type: "error" });
      }
    },
    async newCurso({ commit }, payload) {
      try {
        console.log(payload);
        const result = await axios.post(config.baseURLApi + `/cursos`, payload);
        this._vm.$toasted.show("Cursos creado", {
          type: "success",
        });
        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
  },
};
