<template>
  <div>
    <CertCoalboradoresTable />
  </div>
</template>
<script>
import CertCoalboradoresTable from "@/components/LOGIC/colaboradores/ColaboradoresTable";
import Loader from "@/components/Loader/Loader";
export default {
  components: { Loader, CertCoalboradoresTable },
  name:'CertCoalboradores',
  data() {
    return {};
  },
};
</script>
