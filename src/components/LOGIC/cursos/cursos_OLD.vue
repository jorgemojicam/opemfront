<template>
  <div>
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <ul>
        <li v-for="item in dataTable" :key="item.id_cur">
          {{ item.nombre_cur }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("cursos");

import Loader from "@/components/Loader/Loader";
import cursosservice from "../../../services/cursos.service";
export default {
  components: { Loader },
  data() {
    return { dataTable: [] };
  },
  computed: {
    ...mapState(["loading","dataTable"]),
  },
  methods: {
    ...mapActions(["setData"]),

    async get() {
     try {
        let res = await cursosservice.get();
        this.dataTable = res.data;
        this.setData(this.dataTable);
        this.loading=false
      } catch (error) {
        console.log(error);
      }
    },
    async load() {
        this.loading=true;
        await this.get();
    },
  },
  async beforeMount() {
      await this.load();
   
  },
};
</script>
