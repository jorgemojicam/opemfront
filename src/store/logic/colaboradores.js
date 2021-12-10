import axios from "axios";

export default {
  namespaced: true,
  state: {
    dataTable: [],
    dataList: [],
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
    setDataList(state, payload) {
      state.dataList = [];
      state.dataList = payload;
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
      const nombre = payload.nombre ? `&nombre=${payload.nombre}`: ``
   
      try {
        commit("showLoader");
        const response = await axios.get(`/colaboradores?page=${payload.page}&size=${payload.size}${nombre}`);
        console.log(response.data) 
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
        const result = await axios.post(`/colaboradores`, payload);
        this._vm.$toasted.show("colaborador creado", {
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
        await axios.delete(`/colaboradores/${state.deleteId}`);
        this._vm.$toasted.show("colaboradores delete", {
          type: "success",
        });
        dispatch("getData");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async getDataList({
      commit
    }, payload) {
      try {
        commit("showLoader");
        
        const idemp = payload.idemp ? `?idemp=${payload.idemp}` : ``
        console.log("state ",idemp)
        const response = await axios.get(`/colaboradores/getByParam${idemp}`);
        commit("setDataList", response.data);
        commit("hideLoader");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
  },
};