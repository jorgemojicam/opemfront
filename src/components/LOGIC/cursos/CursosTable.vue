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

    <b-table striped hover bordered light :items="dataTable" :fields="fields">
      <template #cell(actions)="row">
        <b-button
          pill
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-2"
          variant="success"
        >
          <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
          Edit
        </b-button>
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
import cursosservice from "../../../services/cursos.service";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  components: { Loader },
  data() {
    return {
      dataTable:[],
      fields: [
        { key: "nombre_cur", lable: "Nombre" },
        { key: "descripcion_cur", lable: "Descripcion" },
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
      loading: (state) => state.cursos.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_cur;
      this.setDeleteId(item.id_cur);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      setData: "cursos/setData",
      deleteItem: "cursos/deleteItem",
    }),
    ...mapMutations({
      setDeleteId: "cursos/setDeleteId",
      hideLoader: "cursos/hideLoader",
      showLoader: "cursos/showLoader",
    }),
    del() {
      this.$bvModal.hide("del");
      this.deleteItem();
    },
   async get() {
     try {
        let res = await cursosservice.get();
        this.dataTable = res.data;
        this.setData(this.dataTable);
        this.hideLoader();
      } catch (error) {
        console.log(error);
      }
    },
    async load() {
        this.showLoader();
        await this.get();
    },
  },


  beforeMount() {
    this.load();
    
  },
};
</script>
