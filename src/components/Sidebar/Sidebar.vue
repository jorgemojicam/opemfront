<template>
  <div class="sidebar-wrapper">
    <nav
      :class="{ sidebar: true, sidebarStatic, sidebarOpened }"
      @mouseenter="sidebarMouseEnter"
      @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/app/dashboard"
          ><span class="primary-word">Opem </span>
        </router-link>
      </header>

      <ul class="nav">
        <NavLink
          :activeItem="activeItem"
          header="Dashboard"
          link="/app/dashboard"
          iconName="fi flaticon-home"
          index="dashboard"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="Configuracion"
          link="/admin/configuraciones"
          iconName="fa fa-cog"
          index="configuraciones"
          :childrenLinks="[
            { header: 'Pais', link: '/admin/configuraciones/paises' },           
            { header: 'Departamentos', link: '/admin/configuraciones/departamentos' },
            { header: 'Ciudades', link: '/admin/configuraciones/ciudades' },
            { header: 'Tipo Documentos', link: '/admin/configuraciones/tipodocs' },
            
          ]"
        />
        <NavLink
          :activeItem="activeItem"
          header="Cursos"
          link="/admin/cursos"
          iconName="fa fa-graduation-cap"
          index="cursos"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="Certificaciones"
          link="/admin/certificaciones"
          iconName="fa fa-table"
          index="cursos"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="Empresas"
          link="/admin/empresas"
          iconName="fa fa-building"
          index="empresas"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="Colaboradores"
          link="/admin/colaboradores"
          iconName="fa fa-users"
          index="colaboradores"
          isHeader
        />
        <NavLink
          :activeItem="activeItem"
          header="Generar Cert"
          link="/admin/certcolaboradores"
          iconName="fa fa-file"
          index="certcolaboradores"
          isHeader
        />
      </ul>
       

     
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import isScreen from "@/core/screenHelper";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: "Sales Report",
          value: 15,
          footer: "Calculating x-axis bias... 65%",
          color: "danger",
        },
        {
          id: 1,
          title: "Personal Responsibility",
          value: 20,
          footer: "Provide required notes",
          color: "primary",
        },
      ],
    };
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split("/");
      paths.pop();
      this.changeSidebarActive(paths.join("/"));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen("lg") || isScreen("xl"))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState("layout", {
      sidebarStatic: (state) => state.sidebarStatic,
      sidebarOpened: (state) => !state.sidebarClose,
      activeItem: (state) => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
