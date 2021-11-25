<template>
  <div>
    <EmpresasTable />
  </div>
</template>
<script>
import EmpresasTable from "@/components/LOGIC/empresas/EmpresasTable";
import Loader from "@/components/Loader/Loader";

export default {
  components: { Loader, EmpresasTable },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
