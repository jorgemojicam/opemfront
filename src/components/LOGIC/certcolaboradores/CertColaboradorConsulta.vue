<template>
  <div>
    <b-navbar
      class="header d-print-none app-header"
      variant="light"
      type="light"
    >
      <b-navbar-brand href="#">
        <img
          src="../../../assets/logoopem.png"
          class="d-inline-block align-top"
          alt="Kitten"
        />
      </b-navbar-brand>
    </b-navbar>

    <b-container>
      <breadcrumb-history></breadcrumb-history>

      <b-card border-variant="primary">
        <b-card-text>
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="10">
                <b-form-input
                  id="numerodocumento"
                  placeholder="Numero cedula"
                  v-model="cedula"
                ></b-form-input>
              </b-col>
              <b-col sm="2">
                <b-button
                  variant="primary"
                  class="d-inline-block"
                  @click="filter"
                >
                  <b-icon icon="search"></b-icon> Buscar
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-card-text>
      </b-card>
      <div v-if="loading"><Loader /></div>

      <b-table
        v-else
        striped
        hover
        light
        :items="dataTable.items"
        :fields="fields"
      >
        <template #cell(estado)="row">
          <span v-if="row.item.estado_ceco ==1" class="badge badge-pill badge-success">Aprobado</span>
          <span v-else class="badge badge-pill badge-secondary">Rechazado</span>
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
    </b-container>
  </div>
</template>


<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Loader from "@/components/Loader/Loader";
import BreadcrumbHistory from "@/components/BreadcrumbHistory/BreadcrumbHistory";
export default {
  components: { Loader, BreadcrumbHistory },
  name: "CertColaboradoresTable",
  data() {
    return {
      fields: [
        { key: "consecutivo_ceco", label: "#" },
        {
          key: "colaboradore.nombres_col",
          label: "Aprendiz",
          sortable: true,
        },
        { key: "certificacione.curso.nombre_cur", label: "Curso" },
        { key: "certificacione.cohorte_cer", label: "Cohorte" },
        { key: "certificacione.fechainicio_cer", label: "Fecha inicio" },
        { key: "certificacione.fechafin_cer", label: "Fecha fin" },
        { key: "empresa.nombre_emp", label: "Empresa" },
        { key: "estado", label: "Estado" },
      ],
      cedula: "",
      page: 1,
      count: 0,
      pageSize: 10,
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.certcolaboradores.dataTable,
      loading: (state) => state.certcolaboradores.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_emp;
      this.setDeleteId(item.id_emp);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "certcolaboradores/getDataByCedula",
      deleteItem: "certcolaboradores/deleteItem",
    }),
    ...mapMutations({
      setDeleteId: "certcolaboradores/setDeleteId",
      hideLoader: "certcolaboradores/hideLoader",
      showLoader: "certcolaboradores/showLoader",
    }),
    getRequestParams(page, pageSize, numerodocumento) {
      let params = {};
      if (numerodocumento) {
        params["numerodocumento"] = numerodocumento;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    retrieveParam() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize,
        this.cedula
      );

      this.getData(params);
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveParam();
    },
    filter() {
      this.page = 1;
      this.retrieveParam();
    },
  },

  beforeMount() {
    this.cedula = this.$route.params.cedula;
    this.retrieveParam();
    this.page = this.dataTable.currenPage;
    this.count = this.dataTable.totalItems;
  },
};
</script>

<style src="../../Header/Header.scss" lang="scss" scoped />