<template>
  <div>
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="12">
          <b-form-group label="Roles" label-for="roles">
            <b-form-select
              v-model="idrol"
              :options="dataRoles"
              value-field="id_rol"
              text-field="nombre_rol"
              @change="changeRol"
            >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>

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
        { key: "nombre_mod", label: "Nombre", sortable: true },
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
      dataTable: (state) => state.modulos.dataTable,
      dataRoles: (state) => state.roles.dataTable,
      loading: (state) => state.modulos.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_emp;
      this.setDeleteId(item.id_emp);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "modulos/getData",
      getDataRoles: "roles/getData",
      deleteItem: "permisos/deleteItem",
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
    changeRol() {
      this.getData({ idrol: this.idrol });
    },
  },
  beforeMount() {
    this.getDataRoles();
    this.idrol = this.dataRoles[0].id_rol;
    this.getData({ idrol: this.idrol });
    console.log(this.dataTable)
  },
};
</script>
