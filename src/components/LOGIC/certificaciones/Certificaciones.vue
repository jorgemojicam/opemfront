<template>
  <div>
    <CertificacionesTable />
  </div>
</template>
<script>
import CertificacionesTable from "@/components/LOGIC/certificaciones/CertificacionesTable";
import Loader from "@/components/Loader/Loader";
export default {
  components: { Loader, CertificacionesTable },
  data() {
    return {};
  },
};
</script>
