<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">{{ formName }} Certificaciones</h4>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="12">
            <b-form-group label="Cursos" label-for="nit">
              <b-form-input list="my-list-id"></b-form-input>
              <datalist id="my-list-id">
                <option>Manual Option</option>
                <option v-for="item in sizes" :key="item">{{ item }}</option>
              </datalist>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Fecha Inicio" label-for="fechai">
              <b-form-input
                type="date"
                label="Fecha Inicio"
                v-model="dataForm.fechai"
              />
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Fecha Fin" label-for="fechaf">
              <b-form-input
                type="date"
                label="Fecha Fin"
                v-model="dataForm.fechaf"
              />
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Horas duracion" label-for="horas">
              <b-form-input
                type="number"
                label="Horas"
                v-model="dataForm.horas"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <button type="submit" class="btn btn-primary">Guardar</button>
            <button
              @click="resetData"
              type="button"
              class="btn btn-light ml-2"
              v-if="!this.$route.params.id"
            >
              Limpiar
            </button>
            <router-link :to="cancelUrl">
              <button type="button" class="btn btn-light ml-2">Volver</button>
            </router-link>
          </b-col>
        </b-row>
      </b-container>
    </form>
  </Widget>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
export default {
  name: "empresasNew",
  mixins: [validationMixin],
  data() {
    return {
      formName: "Crear",
      sizes: ["Small", "Medium", "Large", "Extra Large"],
      dataForm: {
        cursos: "",
        fechai: "",
        fechaf: "",
        horas: "",
      },
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.empresas.dataForm,
    }),
    cancelUrl() {
      return (
        "/" + this.$route.fullPath.split("/").slice(1).splice(0, 2).join("/")
      );
    },
  },
  methods: {
    ...mapActions({
      newEmpresa: "empresas/newEmpresa",
      editEmpresa: "empresas/editEmpresa",
      getDataForm: "empresas/getDataForm",
    }),
    async submitHandler() {
      // -- Form Validation with vuevalidate
      this.$v.dataForm.$touch();
      if (this.$v.dataForm.$anyError) {
        return;
      }

      try {
        if (this.$route.params.id) {
          this.dataForm = {
            ...this.dataForm,
            id: this.$route.params.id,
          };
          await this.editEmpresa(this.dataForm);
        } else {
          await this.newEmpresa(this.dataForm);
        }
        this.$router.push(this.cancelUrl);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },

    resetData() {
      if (this.dataForm) {
        this.dataForm = this.data;
      } else {
        this.dataForm = {
          nombre: "",
          nit: "",
          telefono: "",
          correo: "",
          direccion: "",
          personacontacto: "",
        };
      }
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.dataForm[name];
      return $dirty ? !$error : null;
    },
    async setComponent(mode) {
      if (mode === "edit") {
        this.formName = "Editar";
        try {
          await this.getDataForm(this.$route.params.id);
          this.resetData();
        } catch (e) {
          this._vm.$toasted.show("Error " + e, {
            type: "error",
          });
        }
      }
    },
  },
  beforeMount() {
    const modeForm = this.$route.path.split("/").pop();
    this.setComponent(modeForm);
  },
};
</script>
