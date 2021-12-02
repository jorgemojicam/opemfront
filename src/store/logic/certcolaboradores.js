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
        commit("showLoader");
        var param = `?page=${payload.page}&size=${payload.size}`

        if (payload.idcol) {
          param += `&idcol=${payload.idcol}`
        }
        if (payload.idemp) {
          param += `&idemp=${payload.idemp}`
        }
        if (payload.idcer) {
          param += `&idcer=${payload.idcer}`
        }     
        const response = await axios.get(`/certcol${param}`);

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
        const result = await axios.post(`/certcol`, payload);
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
        await axios.delete(`/certcol/${state.deleteId}`);
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
  },
};