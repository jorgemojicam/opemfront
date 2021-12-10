<template>
  <div>
    <b-button-group class="mb-2">
      <router-link :to="$route.fullPath + '/new'">
        <b-button variant="outline-primary">
          <b-icon icon="plus-circle-fill"></b-icon> Nueva
        </b-button>
      </router-link>
      <b-button v-b-toggle.collapse-1 variant="outline-primary">
        <b-icon icon="search"></b-icon> Filtro
      </b-button>
    </b-button-group>
    <!-- filtros -->
    <b-collapse id="collapse-1">
      <b-card border-variant="primary">
        <b-card-text>
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="3">
                <b-form-input
                  id="numerodocumento"
                  placeholder="Numero cedula"
                  v-model="cedula"
                ></b-form-input>
              </b-col>
              <b-col sm="3">
                <b-form-input
                  id="nombre"
                  placeholder="Nombres"
                  v-model="nombre"
                ></b-form-input>
              </b-col>
              <b-col sm="3">
                <b-form-select
                  :options="dataEmpresa"
                  value-field="id_emp"
                  text-field="nombre_emp"
                  v-model="idemp"
                >
                  <b-form-select-option value=""
                    >-Todas las Empresas-</b-form-select-option
                  >
                </b-form-select>
              </b-col>
              <b-col sm="3">
                <b-button variant="primary" @click="filter">
                  <b-icon icon="search"></b-icon> Buscar
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-card-text>
      </b-card>
    </b-collapse>
    <br />
    <div v-if="loading"><Loader /></div>
    <!-- tabla -->
    <b-table
      v-else
      striped
      hover
      light
      :items="dataTable.items"
      :fields="fields"
    >
      <template #cell(edit)="row">
        <router-link :to="`${$route.fullPath}/${row.item.id_emp}/edit`">
          <b-button pill size="sm" class="mr-2" variant="success">
            <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
          </b-button>
        </router-link>
      </template>
      <template #cell(delete)="row">
        <b-button
          pill
          variant="danger"
          size="sm"
          @click="info(row.item, row.index, $event.target)"
        >
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
        </b-button>
      </template>
    </b-table>
    <!-- paginacion  -->
    <b-pagination
      v-model="page"
      :total-rows="count"
      :per-page="pageSize"
      align="fill"
      size="sm"
      class="mt-4"
      @change="handlePageChange"
    ></b-pagination>
    <!-- Info modal -->
    <b-modal :id="infoModal.id" title="Cuidado !" hide-footer>
      <div class="d-block text-center">
        Esta seguro de eliminar la empresa
        <strong>{{ infoModal.empresa }}</strong>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="del"
        >Eliminar</b-button
      >
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Loader from "@/components/Loader/Loader";
import { validationMixin } from "vuelidate";

export default {
  mixins: [validationMixin],
  components: { Loader },
  data() {
    return {
      fields: [
        { key: "pai.inicianles_pais", label: "Pais" },
        { key: "tipodocumento.iniciales_tipo", label: "Tipo Documento" },
        { key: "numerodocumento_col", label: "Numero Documento" },
        { key: "nombres_col", label: "Nombres", sortable: true },
        { key: "apellidos_col", label: "Apellidos" },
        { key: "empresa.nombre_emp", label: "Empresa" },
        { key: "correopersonal_col", label: "Correo" },
        { key: "telefono_col", label: "Telefono" },
        { key: "edit", label: "" },
        { key: "delete", label: "" },
        { key: "singup", label: "" },
      ],
      infoModal: {
        id: "info-modal",
        colaborador: "",
      },
      page: 1,
      count: 0,
      pageSize: 10,
      nombre: "",
      cedula: "",
      idemp: "",
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.colaboradores.dataTable,
      loading: (state) => state.colaboradores.loading,
      dataEmpresa: (state) => state.empresas.dataList,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_emp;
      this.setDeleteId(item.id_emp);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "colaboradores/getData",
      deleteItem: "colaboradores/deleteItem",
      getDataEmpresa: "empresas/getDataList",
    }),
    ...mapMutations({
      setDeleteId: "colaboradores/setDeleteId",
      hideLoader: "colaboradores/hideLoader",
      showLoader: "colaboradores/showLoader",
    }),
    del() {
      this.$bvModal.hide("del");
      this.deleteItem();
    },
    getRequestParams(nombre, page, pageSize) {
      let params = {};
      if (nombre) {
        params["nombre"] = nombre;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    retrieveTutorials() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );
      this.getData(params);
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveTutorials();
    },
    filter() {
      const params = this.getRequestParams(this.nombre, 1, 10);      
      this.getData(params);
    },
  },
  beforeMount() {
    this.getData({ page: 0, size: 10 });
    this.getDataEmpresa();
    this.page = this.dataTable.currenPage;
    this.count = this.dataTable.totalItems;
  },
};
</script>
