<template>
  <div>
    <PermisosTable />
  </div>
</template>
<script>
import Loader from "@/components/Loader/Loader";
import PermisosTable from "@/components/LOGIC/permisos/PermisosTable";
export default {
  components: { Loader, PermisosTable },
  name: "Permisos",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
