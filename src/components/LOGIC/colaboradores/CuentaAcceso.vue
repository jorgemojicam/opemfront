<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">{{ formName }} Cuenta Acceso</h4>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="5">
            <b-form-group label="Numero Documento" label-for="numerodocumento">
              <b-form-input
                id="username"
                v-model="dataForm.username"
                placeholder="Usuario"
                :state="validateState('username')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group label="Password" label-for="password">
              <b-form-input
                v-model="dataForm.password"
                placeholder="Password"
                :state="validateState('password')"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="5">
            <b-form-group label="Rol" label-for="idrol">
              <b-form-select
                v-model="dataForm.idrol"
                :options="dataRoles"
                value-field="id_rol"
                text-field="nombre_rol"
              >
              </b-form-select>
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
  name: "colaboradoresNew",
  mixins: [validationMixin],
  data() {
    return {
      formName: "Crear",
      dataForm: {
        username: "",
        password: "",
        idrol: "",
      },
    };
  },
  validations: {
    dataForm: {
      username: {
        required,
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(12),
      },
      idrol: {
        required
      },
    },
  },
  computed: {
    ...mapState({
      data: (state) => state.colaboradores.dataForm,
      dataRoles: (state) => state.roles.dataTable,
      
    }),
    cancelUrl() {
      return (
        "/" + this.$route.fullPath.split("/").slice(1).splice(0, 2).join("/")
      );
    },
  },
  methods: {
    ...mapActions({
      newItem: "cuentaacceso/newItem",
      editItem: "cuentaacceso/editItem",
      getDataForm: "cuentaacceso/getDataForm",
      getDataPais: "paises/getData",
      getDataTipoDoc: "tipodocumento/getData",
      getDataEmpresa: "empresas/getDataList",
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
          console.log(this.dataForm);

          await this.editItem(this.dataForm);
        } else {
          await this.newItem(this.dataForm);
        }
        this.$router.push(this.cancelUrl);
      } catch (e) {
        console.log(e);
        /*
        this._vm.$toasted.show("Error: " + e, {
          type: "error",
        });*/
      }
    },

    resetData() {
      if (this.dataForm) {
        this.dataForm = this.data;
      } else {
        this.dataForm = {
          fechainicio: "",
          fechafin: "",
          horas: "",
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
    this.getDataPais();
    this.getDataTipoDoc();
    this.getDataEmpresa();
  },
};
</script>
