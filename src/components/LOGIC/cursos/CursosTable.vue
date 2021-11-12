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
    <b-table
      v-else
      striped
      hover
      bordered
      light
      :items="dataTable"
      :fields="fields"
    >
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
    <b-modal :id="infoModal.id" :title="infoModal.title" >
      <pre>{{ infoModal.content }}</pre>
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
      data: [],
      fields: [
        { key: "nombre_cur", lable: "Nombre" },
        { key: "descripcion_cur", lable: "Descripcion" },
        { key: "actions", label: "Opciones" },
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.cursos.data,
      loading: (state) => state.cursos.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "cursos/getData",
    }),
    ...mapMutations({
      setDeleteId: "cursos/setDeleteId",
    }),
  },
  del() {
    this.$bvModal.hide("del");
    this.deleteItem();
  },

  beforeMount() {
    this.getData();
  },
};
</script>
