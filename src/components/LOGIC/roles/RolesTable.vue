<template>
  <div>
    <router-link :to="$route.fullPath + '/new'">
      <b-button variant="outline-primary">
        <b-icon icon="plus-circle-fill"></b-icon> Nueva
      </b-button>
    </router-link>

    <div v-if="loading"><Loader /></div>
    <!-- tabla -->
    <b-table v-else striped hover light :items="dataTable" :fields="fields">
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
        { key: "nombre_rol", label: "Nombre", sortable: true },
        { key: "descripcion_rol", label: "Descripcion" },
        { key: "edit", label: "" },
        { key: "delete", label: "" },
      ],
      infoModal: {
        id: "info-modal",
        colaborador: "",
      },
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.roles.dataTable,
      loading: (state) => state.roles.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_emp;
      this.setDeleteId(item.id_emp);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "roles/getData",
      deleteItem: "roles/deleteItem",
    }),
    ...mapMutations({
      setDeleteId: "roles/setDeleteId",
      hideLoader: "roles/hideLoader",
      showLoader: "roles/showLoader",
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
