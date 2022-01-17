<template>
  <div>
    <b-button-group class="mb-2">     
      <b-button variant="outline-primary">
        <b-icon icon="search"></b-icon> Filtro
      </b-button>
    </b-button-group>

    <div v-if="loading"><Loader /></div>
    <b-table
      v-else
      striped
      hover
      light
      :items="dataTable"
      :fields="fields"
      @row-clicked="rowClicked"
    >
      <template #cell(edit)="row">
        <router-link
          :to="{
            name: 'cursosnew',
            params: {
              id: row.item.id_cur,
              mode: 'edit',
              father: 'Cursos',
            },
          }"
        >
          <b-button pill size="sm" class="mr-2" variant="success">
            <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
            
          </b-button>
        </router-link>
      </template>
    </b-table>

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
        { key: "title_mod", label: "Titulo" },      
        { key: "father_mod", label: "Pertenece" },
        { key: "edit", label: "" },  
      ], 
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.modulos.dataTable,
      loading: (state) => state.modulos.loading,
    }),
  },
  methods: {  
    ...mapActions({
      getData: "modulos/getData",
      deleteItem: "modulos/deleteItem",
    }),
    ...mapMutations({
      hideLoader: "modulos/hideLoader",
      showLoader: "modulos/showLoader",
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
