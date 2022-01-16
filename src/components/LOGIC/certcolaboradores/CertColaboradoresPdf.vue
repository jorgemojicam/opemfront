<template>
  <div>
    <div class="page">
      <div class="cert-content">
        <div class="cert-id">
          <span>Certificado</span>
          <span>ID <span class="id-text">ID AAR-EC-0006/050 </span></span>
        </div>
        <div class="cert-details">
          <h3>{{ details.colaborador.nombres }}</h3>
          <h3>{{ details.colaborador.apellidos }}</h3>
          <span>CC {{details.colaborador.cedula}}</span>
        </div>
        <div class="cert-curso">
          <span>Asistió y aprobó satisfactoriamente el curso</span>
          <h3>{{details.curso.nombre}}</h3>
        </div>
        <div class="cert-dates">
          <h5 class="intensity">Realizado con una intensidad de 20 horas</h5>
          <h5 class="dat">Fecha de expedición: 09 de Septiembre de 2021</h5>
        </div>
        <div class="cert-sign">
          <img src="../../../assets/certificado/firma.png" class="img-sign" />
          <h5>JUAN JOSÉ SOLANO MEZA</h5>
          <h6>Director de Formación Empresarial</h6>
          <span>
            Emitido por
            <span>OPTIMIZACIÓN EMPRESARIAL S.A.S</span>
          </span>
          <h5 class="license">Licencia en SST 00-10536</h5>
          <span>Bucaramanga - Colombia</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/Loader/Loader";
import QrcodeVue from "qrcode.vue";
export default {
  components: { Loader, QrcodeVue },
  name: "CertCoalboradoresPdf",
  props: {
    details: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // if(Object.keys(this.details).length == 0 ){
    //   }
  },
};
</script>

<style  src="./Certificado.scss" lang="scss"  />