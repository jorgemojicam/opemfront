<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">{{ formName }} curso</h4>

      <b-form-group label="nombre" label-for="nombre">
        <b-form-input
          type="text"
          label="nombre"
          v-model="dataForm.nombre"
          :state="validateState('nombre')"
          aria-describedby="input-error-nombre"
        />
        <b-form-invalid-feedback id="input-error-nombre"
          >Debe ingresar el nombre de la empresa.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-form-group label="descripcion" label-for="descripcion">
        <b-form-textarea
          :rows="3"
          label="descripcion"
          v-model="dataForm.descripcion"
          :state="validateState('descripcion')"
          aria-describedby="input-descripcion-error"
        />
        <b-form-invalid-feedback id="input-descripcion-error"
          >Debe ingresar descripcion de la empresa minimo 5
          caracteres.</b-form-invalid-feedback
        >
      </b-form-group>

      <b-row>
        <b-col>
          <button type="submit" class="btn btn-primary">Guardar</button>
          <button @click="resetData" type="button" class="btn btn-light ml-2">
            Limpiar
          </button>
          <router-link :to="cancelUrl">
            <button type="button" class="btn btn-light ml-2">Volver</button>
          </router-link>
        </b-col>
      </b-row>
    </form>
  </Widget>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
export default {
  name: "cursosNew",
  mixins: [validationMixin],
  data() {
    return {
      formName: "Crear",

      dataForm: {
        id_cur: null,
        nombre: "",
        descripcion: "",
      },
    };
  },
  validations: {
    dataForm: {
      nombre: {
        required,
      },
      descripcion: {
        required,
        minLength: minLength(5),
      },
    },
  },
  computed: {
    ...mapState({
      data: (state) => state.cursos.dataForm,
    }),
    cancelUrl() {
      return (
        "/" + this.$route.fullPath.split("/").slice(1).splice(0, 2).join("/")
      );
    },
  },
  methods: {
    ...mapActions({
      newCurso: "cursos/newCurso",
      getDataForm: "cursos/getDataForm",
    }),
    async submitHandler() {
      // -- Form Validation with vuevalidate
      this.$v.dataForm.$touch();
      if (this.$v.dataForm.$anyError) {
        return;
      }

      try {
        await this.newCurso(this.dataForm);
        this.$router.push(this.cancelUrl);
      } catch (e) {
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },

    resetData() {
      if(this.dataForm){
        this.dataForm= this.data;
      }else{
        this.dataForm = {
        id_cur: "",
        nombre: "",
        escripcion_cur: "",
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
        let id_cur =this.$route.params.id
        try {
          
          await this.getDataForm(id_cur);
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
    console.log(modeForm);
    this.setComponent(modeForm);
  },
};
</script>
