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
    async getData({
      commit
    }, payload) {   
      try {
        commit("showLoader");
        const response = await axios.get(`/empresa?page=${payload.page}&size=${payload.size}`);
        commit("getData", response.data);
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

        const response = await axios.get(`/empresa/${payload}`);

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
    async newEmpresa({
      commit
    }, payload) {
      try {
        const result = await axios.post(`/empresa`, payload);
        this._vm.$toasted.show("Empresa creada", {
          type: "success",
        });

        commit(`getData`, result.data);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    async editEmpresa({
      commit
    }, payload) {
      try {
        const result = await axios.put(`/empresa`, payload);
        this._vm.$toasted.show("Empresa actualizada", {
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
        await axios.delete(`/empresa/${state.deleteId}`);
        this._vm.$toasted.show("Empresa delete", {
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