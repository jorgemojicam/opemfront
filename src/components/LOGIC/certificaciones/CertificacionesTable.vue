 <template>
  <div>
    <b-button-group class="mb-2">
      <router-link :to="$route.fullPath + '/new'">
        <b-button variant="outline-primary">
          <b-icon icon="plus-circle-fill"></b-icon> Nuevo
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

    <b-table striped hover bordered light :items="tableData" :fields="fields">
      <template #cell(actions)="row">
        <b-button
          pill
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-2"
          variant="success"
        >
          <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
          
        </b-button>
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

    <b-modal id="del" title="Confirm delete" cancel-variant="default">
      Are you sure you want to delete this item?

      <template #modal-footer="">
        <button class="btn btn-primary" @click="$bvModal.hide('del')">
          Cancel
        </button>
        <button class="btn btn-danger" @click="del">Delete</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Loader from "@/components/Loader/Loader";
import dataFormatter from "@/use/dataFormatter.js";
import FilterForm from "@/components/Filter/Filter";

export default {
  components: { FilterForm, Loader },
  data() {
    return {
      config: [],
      fields: [
        { key: "curso.nombre_cur", label: "curso" },
        { key: "fechainicio_cer", label: "fechainicio" },
        { key: "fechafin_cer", label: "fechafin" },
        { key: "horas_cer", label: "horas" },
        { key: "actions", label: "Opciones" },
      ],     
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.certificaciones.loading,
      tableData: (state) => state.certificaciones.dataTable,
      modalOpen: (state) => state.certificaciones.modalOpen,
      deleteId: (state) => state.certificaciones.deleteId,
    }),
    dataFormatter() {
      return dataFormatter;
    },
  },
  methods: {
    submitHandler() {
      let request = "?";
      this.config.forEach((item) => {
        item.number
          ? (request += `${item.filter}Range=${item.valueFrom}&${item.filter}Range=${item.valueTo}&`)
          : (request += `${item.filter}=${item.value}&`);
      });
      this.getFilteredData(request);
    },
    clearFilters() {
      this.getData();
    },
    delFilter(index) {
      this.config.splice(index, 1);
      this.config.length === 0 ? (this.showFilters = false) : null;
    },
    addFilter() {
      !this.showFilters ? (this.showFilters = true) : null;
      this.config.push({});
    },
    apply(data) {
      let id = data.id;
      this.config.splice(id, 1, data);
    },
    onRowClick({ row }) {
      this.$router.push(`/admin/certificaciones/${row.id}/edit`);
    },
    ...mapActions({
      getData: "certificaciones/getData",
      getFilteredData: "certificaciones/getFilteredData",
      deleteItem: "certificaciones/deleteItem",
    }),
    ...mapMutations({
      setDeleteId: "certificaciones/setDeleteId",
    }),
    del() {
      this.$bvModal.hide("del");
      this.deleteItem();
    },
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style scoped>
.image-preview {
  width: 191px;
  height: 141px;
  background-size: cover;
  background-position: 50% center;
}
.table-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.file {
  display: block;
  white-space: nowrap;
}
</style>

