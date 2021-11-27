<template>
  <div>
    <b-button-group class="mb-2">
      <router-link :to="$route.fullPath + '/new'">
        <b-button variant="outline-primary" >
          <b-icon icon="plus-circle-fill"></b-icon> Nueva
        </b-button>
      </router-link>
      <b-button variant="outline-primary">
        <b-icon icon="search"></b-icon> Filtro
      </b-button>
      <b-button variant="outline-primary">
        <b-icon icon="printer"></b-icon> Imprimir
      </b-button>
    </b-button-group>

    <div v-if="loading"><Loader /></div>
    <b-table
      v-else
      striped
      hover
      bordered
      light
      :items="dataTable.items"
      :fields="fields"
      @row-clicked="rowClicked"
    >
      <template #cell(actions)="row">
        <router-link :to="`${$route.fullPath}/${row.item.id_emp}/edit`">
          <b-button pill size="sm" class="mr-2" variant="success">
            <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
            Editar
          </b-button>
        </router-link>
        <b-button
          pill
          variant="danger"
          size="sm"
          @click="info(row.item, row.index, $event.target)"
        >
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          Delete
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
        { key: "id_ceco", label: "id" },
        { key: "idcer_ceco", label: "Pais" },
        { key: "idcol_ceco", label: "Tipo Documento" },
        { key: "idemp_ceco", label: "Numero Documento" },
        { key: "descargado_ceco", label: "Nombres" },       
      ],
      infoModal: {
        id: "info-modal",
        empresa: "",
      },
      page: 1,
      count: 0,
      pageSize: 3,
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.colaboradores.dataTable,
      loading: (state) => state.colaboradores.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_emp;
      this.setDeleteId(item.id_emp);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "certcolaboradores/getData",
      deleteItem: "certcolaboradores/deleteItem",
    }),
    ...mapMutations({
      setDeleteId: "certcolaboradores/setDeleteId",
      hideLoader: "certcolaboradores/hideLoader",
      showLoader: "certcolaboradores/showLoader",
    }),
    del() {
      this.$bvModal.hide("del");
      this.deleteItem();
    },
    rowClicked(val, row) {
      console.log(val, row);
      //this.$router.push(`/admin/cursos/${row.id}/edit`)
    },
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};
      if (searchTitle) {
        params["title"] = searchTitle;
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
  },

  beforeMount() {
    this.getData({ page: 0, size: 10 });
    this.page = this.dataTable.currenPage;
    this.count = this.dataTable.totalItems;
    this.pageSize = this.dataTable.totalPages;
  },
};
</script>
