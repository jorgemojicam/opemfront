import axios from "axios";

export default {
  namespaced: true,
  state: {
    dataTable: [],
    dataList: [],
    dataForm: {},
    loading: false,
    modalOpen: false,
    deleteId: null,
  },
  mutations: {
    getData(state, payload) {
      state.dataTable = [];
      state.dataTable = payload;
    },
    getDataList(state, payload) {
      state.dataList = [];
      state.dataList = payload;
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
  },
  actions: {
    async getData({
      commit
    }, payload) {
      try {
        commit("showLoader");
        const response = await axios.get(`/permisosroles?page=${payload.page}&size=${payload.size}`);
        commit("getData", response.data);     
        commit("hideLoader");
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async getDataList({
      commit
    }) {
      try {
        commit("showLoader");
        const response = await axios.get(`/empresa`);
        commit("getDataList", response.data.items);
        commit("hideLoader");
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

        const response = await axios.get(`/permisosroles/${payload}`);

        let newData = {
          nombre: response.data.items.nombre_emp || "",
          nit: response.data.items.nit_emp || "",
          telefono: response.data.items.telefono_emp || "",
          correo: response.data.items.correo_emp || "",
          direccion: response.data.items.direccion_emp || "",
          personacontacto: response.data.items.personacontacto_emp || "",
        }
        commit("getDataForm", newData);
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
        const result = await axios.post(`/permisosroles`, payload);
        this._vm.$toasted.show("Permiso creado correctamente", {
          type: "success",
        });

        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async editItem({
      commit
    }, payload) {
      try {
        const result = await axios.put(`/permisosroles/${payload.id}`, payload);
        this._vm.$toasted.show("Permiso actualizado correctamente", {
          type: "success",
        });

        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    }
  },
};