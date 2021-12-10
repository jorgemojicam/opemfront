import axios from "axios";

export default {
  namespaced: true,
  state: {
    dataTable: [],
    dataForm: {},
    loading: false,
    modalOpen: false,
    deleteId: null,
  },
  //-- Will modify the state
  mutations: {
    getData(state, payload) {
      state.dataTable = [];
      state.dataTable = payload;
    },
    getDataForm(state, payload) {
      state.dataForm = payload;
    },
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
    setDeleteId(state, payload) {
      state.deleteId = payload;
    },
  },
  actions: {
    async getData({ commit }) {
      try {
        commit("showLoader");
        const response = await axios.get(`/cursos`);
        commit("getData", response.data);
        commit("hideLoader");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async getDataForm({ commit }, payload) {
      try {
        commit("showLoader");
        const response = await axios.get(`/cursos/${payload}`);
        console.log(response.data);
        commit("getDataForm", response.data[0]);
        commit("hideLoader");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async newCurso({ commit }, payload) {
      try {     
        const result = await axios.post(`/cursos`, payload);
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
    async editCurso({ commit }, payload) {
      try {
        const result = await axios.put(`/cursos/${payload.id}`, payload);
        this._vm.$toasted.show("Curso actualizado", {
          type: "success",
        });

        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async deleteItem({ dispatch, state }) {
      try {
        console.log(state.deleteId);
        await axios.delete(`/cursos/${state.deleteId}`);
        this._vm.$toasted.show("Cursos delete", {
          type: "success",
        });
        dispatch("getData");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
  },
};
