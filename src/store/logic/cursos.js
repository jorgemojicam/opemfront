import axios from "axios";


export default {
  namespaced: true,
  satate: {
    data: [],
    isLoading: false,
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
        state.isLoading = true
    },
    hideLoader(state) {
        state.isLoading = false
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
        const res = await axios.get( `/cursos`);
        commit('showLoader');
        console.log(res.data)
        commit("getData", res.data);

        commit('hideLoader');
      } catch (e) {
        this._vm.$toasted.show("Error : " + e, { type: "error" });
      }
    },
    async newCurso({ commit }, payload) {
      try {
        console.log(payload);
        const result = await axios.post( `/cursos`, payload);
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
    async deleteItem({dispatch, state}) {
      try {
        console.log(state.deleteId);
          await axios.delete(`/cursos/${state.deleteId}`)
          this._vm.$toasted.show('Cursos delete', {
              type : 'success'
          })
          dispatch('getData')
      } catch (e) {
          this._vm.$toasted.show('Error: ' + e , {
              type : 'error'
          })
      }
  }
  },
};
