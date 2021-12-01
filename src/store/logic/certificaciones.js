import axios from "axios";

export default {
  namespaced: true,
  state: {
    dataTable: [],
    loading: false,
    modalOpen: false,
    dataForm: {},
    deleteId: null,
  },
  //-- Will modify the state
  mutations: {
    setData(state, payload) {
      state.dataTable = [];
      state.dataTable = payload;
    },
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
    getDataForm(state, payload) {
      state.dataForm = payload;
    },
    setDeleteId(state, payload) {
      state.deleteId = payload;
    },
  },
  getters: {
    getDataNow(state) {
      return state.dataTable;
    }
  },
  actions: {
    setData({
      commit
    }, payload) {
      commit("setData", payload);
    },
    async getData({
      commit
    }, payload) {
      try {
        const id = payload ? `/${payload.id}` : ""
        commit("showLoader");
        const response = await axios.get(`/certificaciones${id}`);
        commit("setData", response.data);
        commit("hideLoader");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },

    async newItem({
      commit
    }, payload) {
      try {
        console.log(payload);
        const result = await axios.post(`/certificaciones`, payload);
        this._vm.$toasted.show("Certificaciones creado", {
          type: "success",
        });

        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async deleteItem({
      dispatch,
      state
    }) {
      try {
        console.log(state.deleteId);
        await axios.delete(`/certificaciones/${state.deleteId}`);
        this._vm.$toasted.show("Certificaciones delete", {
          type: "success",
        });
        dispatch("getData");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async getDataForm({
      commit
    }, payload) {
      try {
        commit("showLoader");
        
        const response = await axios.get(`/certificaciones/${payload}`);     let newData = {
          id: response.data.items.id_cer || "",
          fechai: response.data.items.fechainicio_cer || "",
          fechaf: response.data.items.fechafin_cer || "",
          cursos: response.data.items.curso || "",

        }
        commit("getDataForm", newData);
        commit("hideLoader");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
  },
};