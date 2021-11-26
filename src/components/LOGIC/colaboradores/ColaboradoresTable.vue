<template>
  <div>
    <b-button-group class="mb-2">
      <router-link :to="$route.fullPath + '/new'">
        <b-button variant="outline-primary">
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
      :items="dataTable"
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
        { key: "nombre_emp", label: "Razon social" },
        { key: "nit_emp", label: "Nit" },
        { key: "telefono_emp", label: "Telefono" },
        { key: "correo_emp", label: "Correo" },
        { key: "actions", label: "Opciones" },
      ],
      infoModal: {
        id: "info-modal",
        empresa: "",
      },
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.empresas.dataTable,
      loading: (state) => state.empresas.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_emp;
      this.setDeleteId(item.id_emp);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "empresas/getData",
      deleteItem: "empresas/deleteItem",
    }),
    ...mapMutations({
      setDeleteId: "empresas/setDeleteId",
      hideLoader: "empresas/hideLoader",
      showLoader: "empresas/showLoader",
    }),
    del() {
      this.$bvModal.hide("del");
      this.deleteItem();
    },
    rowClicked(val, row) {
      console.log(val, row);
      //this.$router.push(`/admin/cursos/${row.id}/edit`)
    },
  },

  beforeMount() {
    this.getData();
  },
};
</script>
