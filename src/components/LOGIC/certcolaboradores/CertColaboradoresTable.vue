<template>
  <div>
    <b-button-group class="mb-2">
      <router-link :to="$route.fullPath + '/new'">
        <b-button variant="outline-primary">
          <b-icon icon="plus-circle-fill"></b-icon> Nueva
        </b-button>
      </router-link>
    </b-button-group>

    <div v-if="loading"><Loader /></div>
    <b-table
      v-else
      striped
      hover
      light
      :items="dataTable.items"
      :fields="fields"
    >
      <template #cell(actions)="row">
        <router-link :to="`${$route.fullPath}/${row.item.id_emp}/edit`">
          <b-button pill size="sm" class="mr-2" variant="success">
            <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
            Editar
          </b-button>
        </router-link>
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

      <template #cell(edit)="row">
        <router-link :to="`${$route.fullPath}/${row.item.id_emp}/edit`">
          <b-button pill size="sm" class="mr-2" variant="success">
            <b-icon icon="pen-fill" aria-hidden="true"></b-icon>
          </b-button>
        </router-link>
      </template>
      <template #cell(pdf)="row">
        <b-button
          pill
          size="sm"
          class="mr-2"
          variant="warning"
          @click="generate(row)"
        >
          <b-icon icon="exclamation-circle" aria-hidden="true"></b-icon>
        </b-button>
      </template>
    </b-table>
    <!-- paginacion  -->
    <b-pagination
      v-model="page"
      :total-rows="count"
      :per-page="pageSize"
      align="fill"
      size="sm"
      class="mt-4"
      @change="handlePageChange"
    ></b-pagination>
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
    <!-- pdf -->

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="certificacion"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <b-container class="bv-example-row">
          <b-row>
            <b-col cols="3"></b-col>
            <b-col cols="7">
              <br /><br /><br /><br /><br /><br /><br /><br />
              <h1>{{ certificado.colaborador.nombres }}</h1>
              cc: 109581176
              <br /><br /><br />
              <br />
              Aplico y aprobo satisfactoriamente el curso
              <h1>{{ certificado.curso.nombre }}</h1>
              <br /><br /><br />
              <br />
              <h3>
                Realizo con una intensidad de
                {{ certificado.curso.duracion }} horas
              </h3>
            </b-col>
             <b-col cols="2"></b-col>
          </b-row>
        </b-container>
      </section>
    </vue-html2pdf>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Loader from "@/components/Loader/Loader";
import { validationMixin } from "vuelidate";
import VueHtml2pdf from "vue-html2pdf";
export default {
  mixins: [validationMixin],
  components: { Loader, VueHtml2pdf },
  data() {
    return {
      fields: [
        {
          key: "colaboradore.nombres_col",
          label: "Colaborador",
          sortable: true,
        },
        { key: "certificacione.curso.nombre_cur", label: "Curso" },
        { key: "certificacione.cohorte_cer", label: "Cohorte" },
        { key: "empresa.nombre_emp", label: "Empresa" },
        {
          key: "descargado_ceco",
          label: "Descargado",
          thClass: "d-none",
          tdClass: "d-none",
        },
        { key: "estado_ceco", label: "Estado" },
        { key: "edit", label: "" },
        { key: "pdf", label: "" },
      ],
      infoModal: {
        id: "info-modal",
        empresa: "",
      },
      certificado: {
        curso: {
          nombre: "",
          duracion: "",
          fechafin: "",
        },
        colaborador: {
          nombres: "",
          cedula: "",
        },
      },
      page: 1,
      count: 0,
      pageSize: 10,
    };
  },
  computed: {
    ...mapState({
      dataTable: (state) => state.certcolaboradores.dataTable,
      loading: (state) => state.certcolaboradores.loading,
    }),
  },
  methods: {
    info(item, index, button) {
      this.infoModal.empresa = item.nombre_emp;
      this.setDeleteId(item.id_emp);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    ...mapActions({
      getData: "certcolaboradores/getData",
      deleteItem: "certcolaboradores/deleteItem",
    }),
    ...mapMutations({
      setDeleteId: "certcolaboradores/setDeleteId",
      hideLoader: "certcolaboradores/hideLoader",
      showLoader: "certcolaboradores/showLoader",
    }),
    del() {
      this.$bvModal.hide("del");
      this.deleteItem();
    },
    getRequestParams(page, pageSize, idcol, idcer, idemp) {
      let params = {};
      if (idcol) {
        params["idcol"] = idcol;
      }
      if (idcol) {
        params["idcer"] = idcer;
      }
      if (idcol) {
        params["idemp"] = idemp;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    retrieveParam() {
      const params = this.getRequestParams(this.page, this.pageSize);
      this.getData(params);
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveParam();
    },
    generate(row) {
      const items = row.item;
      console.log(items);
      this.certificado.curso.nombre = items.certificacione.curso.nombre_cur;
      this.certificado.colaborador.nombres =
        items.colaboradore.nombres_col + " " + items.colaboradore.apellidos_col;
      this.certificado.curso.duracion = items.certificacione.horas_cer;
      this.generateReport();
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },

  beforeMount() {
    const params = this.getRequestParams(1, 10);
    this.getData(params);
    this.page = this.dataTable.currenPage;
    this.count = this.dataTable.totalItems;
    console.log(this.dataTable);
  },
};
</script>
