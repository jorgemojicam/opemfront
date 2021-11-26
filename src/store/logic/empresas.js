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
      console.log("--->", payload)
      try {
        commit("showLoader");
        const response = await axios.get(`/empresa`);
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
          nombre: response.data[0].nombre_emp || "",
          nit: response.data[0].nit_emp || "",
          telefono: response.data[0].telefono_emp || "",
          correo: response.data[0].correo_emp || "",
          direccion: response.data[0].direccion_emp || "",
          personacontacto: response.data[0].personacontacto_emp || "",
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