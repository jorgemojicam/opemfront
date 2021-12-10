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
        setDataList({
            commit
        }, payload) {
            commit("setDataList", payload);
        },
        async getData({
            commit
        }) {
            try {
                commit("showLoader");
                const response = await axios.get(`/paises`);
              
                commit("setDataList", response.data);
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

                const result = await axios.post(`/paises`, payload);
                this._vm.$toasted.show("pais creado", {
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
                await axios.delete(`/paises/${state.deleteId}`);
                this._vm.$toasted.show("Pais delete", {
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

                const response = await axios.get(`/paises/${payload}`);
                console.log(response)
                let newData = {
                    id: response.data.items[0].id_cer || "",
                    fechainicio: response.data.items[0].fechainicio_cer || "",
                    fechafin: response.data.items[0].fechafin_cer || "",
                    horas: response.data.items[0].horas_cer || "",
                    idcur: response.data.items[0].curso.id_cur || "",
                }

                commit("getDataForm", newData);
                commit("hideLoader");
            } catch (e) {
                this._vm.$toasted.show("Error: " + e, {
                    type: "error",
                });
            }
        },
        async editItem({
            commit
        }, payload) {
            const id = payload.id
            try {
                console.log(payload)
                const result = await axios.put(`/paises/${id}`, payload);
                this._vm.$toasted.show("pais actualizada", {
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