<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">{{ formName }} Cuenta Acceso</h4>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="12">
            <b-form-group label="Numero Documento" label-for="username">
              <b-form-input
                id="username"
                readonly
                v-model="dataForm.username"
                placeholder="Usuario"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="5">
            <b-form-group label="Contraseña" label-for="password">
              <b-form-input
                type="password"
                v-model="dataForm.password"
                placeholder="Ingrese Contraseña"
                :state="validateState('password')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="5">
            <b-form-group label="Confirma Contraseña" label-for="password">
              <b-form-input
                type="password"
                v-model="confirmpass"
                placeholder="Repita la contraseña"
                :state="validateState('password')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="2">
            <label for="" class="d-block">Aleatorio</label>
            <button type="button" class="btn btn-primary" @click="generatePass">
              Generar
            </button>
          </b-col>

          <b-col sm="5">
            <b-form-group label="Rol" label-for="idrol">
              <b-form-select
                v-model="dataForm.idrol"
                :options="dataRoles"
                value-field="id_rol"
                text-field="nombre_rol"
                :state="validateState('idrol')"
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
      confirmpass: "",
      dataForm: {
        id: "",
        idcolaborador: "",
        username: "",
        password: "",
        idrol: "",
      },
    };
  },
  validations: {
    dataForm: {
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(15),
      },
      idrol: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      data: (state) => state.cuentaacceso.dataForm,
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
      getDataRoles: "roles/getData",
    }),
    async submitHandler() {
      this.$v.dataForm.$touch();
      if (this.$v.dataForm.$anyError) {
        return;
      }
      try {
        if (this.dataForm.id) {
          this.dataForm = {
            ...this.dataForm,
          };
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
          password: "",
          idrol: "",
        };
      }
      this.dataForm.username = this.$route.params.cedula;
      this.dataForm.idcolaborador = this.$route.params.id;
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.dataForm[name];
      return $dirty ? !$error : null;
    },
    async setComponent() {
      this.formName = "Editar";
      try {
        await this.getDataForm(this.$route.params.id);
        this.resetData();
      } catch (e) {
        this._vm.$toasted.show("Error " + e, {
          type: "error",
        });
      }
    },
    generatePass() {
      const ram = (Math.random() + 1).toString(36).substring(1);
      this.dataForm.password = ram;
      this.confirmpass = ram;
    },
  },
  beforeMount() {
    //const modeForm = this.$route.path.split("/").pop();
    this.setComponent();
    this.getDataRoles();
  },
};
</script>
