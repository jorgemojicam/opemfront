<template>
  <div>
    <RolesTable />
  </div>
</template>
<script>
import Loader from "@/components/Loader/Loader";
import RolesTable from "@/components/LOGIC/roles/RolesTable";
export default {
  components: { Loader, RolesTable },
  name: "Roles",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
