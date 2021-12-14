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
      <template #cell(ver)="row">
        <b-form-checkbox
          unchecked-value="0"
          checked="1"
          :value="loadPermisos(row, 'ver')"
          switch
          @change="changeVer(row, $event)"
        >
        </b-form-checkbox>
      </template>
      <template #cell(crear)="row">
        <b-form-checkbox
          unchecked-value="not_accepted"
          checked="1"
          :value="loadPermisos(row, 'crear')"
          switch
          @change="changeVer(row)"
        >
        </b-form-checkbox>
      </template>
      <template #cell(edit)="row">
        <b-form-checkbox
          unchecked-value="not_accepted"
          checked="1"
          :value="loadPermisos(row, 'editar')"
          switch
          @change="changeVer(row)"
        >
        </b-form-checkbox>
      </template>
      <template #cell(delete)="row">
        <b-form-checkbox
          unchecked-value="not_accepted"
          checked="1"
          :value="loadPermisos(row, 'eliminar')"
          switch
          @change="changeVer(row)"
        >
        </b-form-checkbox>
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
        { key: "ver", label: "Ver" },
        { key: "edit", label: "Editar" },
        { key: "crear", label: "Crear" },
        { key: "delete", label: "Eliminar" },
      ],
      infoModal: {
        id: "info-modal",
        colaborador: "",
      },
      selected: [],
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
    changeVer(row, check) {
      console.log("----->", row, " --> ", check);
    },
    loadPermisos(row, tipo) {
      if (row.item.roles.length > 0) {
        if (row.item.roles[0].permisosroles) {
          if (tipo === "ver") {
            return row.item.roles[0].permisosroles.ver_prol;
          }else if (tipo === "crear") {
            return row.item.roles[0].permisosroles.crear_prol;
          }else if (tipo === "editar") {
            return row.item.roles[0].permisosroles.editar_prol;
          }else if (tipo === "eliminar") {
            return row.item.roles[0].permisosroles.eliminar_prol;
          }else{
            return 0;
          }
        }else{
          return 0;
        }
      }
    },
  },
  beforeMount() {
    this.getDataRoles();
    this.idrol = this.dataRoles[0].id_rol;
    this.getData({ idrol: this.idrol });
    console.log(this.dataTable);
  },
};
</script>
