<template>
  <div> 
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="hee hee"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="landscape"
      pdf-content-width="800px" 
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <h1>JORGE ENRIQUE MOJICA</h1>
        cc: 109581176
      </section>
    </vue-html2pdf>
  </div>
</template>
<script>
import Loader from "@/components/Loader/Loader";
import VueHtml2pdf from "vue-html2pdf";
export default {
  components: { Loader, VueHtml2pdf },
  name: "CertCoalboradoresPdf",
  data() {
    return {};
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
  mounted(){
    this.generateReport()
  }
};
</script>
