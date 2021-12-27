<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">{{ formName }} Rol</h4>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="4">
            <b-form-group label="Nombre rol" label-for="nombre">
              <b-form-input
                v-model="dataForm.nombre"
                placeholder="Ingrese Nombre rol"
                :state="validateState('nombre')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="8">
            <b-form-group label="Descripcion rol" label-for="descripcion">
              <b-form-input
                v-model="dataForm.descripcion"
                placeholder="Ingrese Descripcion rol"
                :state="validateState('descripcion')"
              ></b-form-input>
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  name: "rolesNew",
  mixins: [validationMixin],
  data() {
    return {
      formName: "Crear",
      dataForm: {
        nombre: "",
        descripcion: "",
      },
    };
  },
  validations: {
    dataForm: {
      nombre: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(40),
      },
      descripcion: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(150),
      },
    },
  },
  computed: {
    ...mapState({
      data: (state) => state.roles.dataForm,
    }),
    cancelUrl() {
      return (        
        `/${this.$route.fullPath.split("/").slice(1).splice(0, 3).join("/")}`
      );
    },
  },
  methods: {
    ...mapActions({
      newItem: "roles/newItem",
      editItem: "roles/editItem",
      getDataForm: "roles/getDataForm",
    }),
    async submitHandler() {
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
          await this.editItem(this.dataForm);
        } else {
          await this.newItem(this.dataForm);
        }
        this.$router.push(this.cancelUrl);
      } catch (e) {        
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });
      }
    },
    resetData() {            
      if (this.data) {      
        this.dataForm = this.data;
      } else {
        this.dataForm = {
          nombre: "",
          descripcion: ""
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
    const modeForm = this.$route.params.mode    
    this.setComponent(modeForm);
  },
};
</script>
