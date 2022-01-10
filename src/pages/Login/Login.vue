<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Opem SAS
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget
        class="widget-auth mx-auto"
        title="<h3 class='mt-0'>Ingresa al portal</h3>"
        customHeader
      >
        <p class="widget-auth-info">Use your username to sign in.</p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="username"
              required
              type="text"
              name="username"
              v-model="username"
              placeholder="Usuario"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="password"
              required
              type="password"
              v-model="password"
              name="password"
              placeholder="Contraseña"
            />
            <router-link class="d-block text-right" to="login"
              >Olvide mi Contraseña</router-link
            >
          </div>

          <b-button
            type="submit"
            size="sm"
            class="auth-btn mb-3"
            variant="inverse"
            >Entrar</b-button
          >
        </form>
        <p class="widget-auth-info">No puedes Ingresar?</p>
        <router-link class="d-block text-center" to="login"
          >Registrarse</router-link
        >
      </Widget>
    </b-container>
    <footer class="auth-footer">
      2021 &copy; Portal de ceritificaciones Opem S.A Realizado por
      <a href="#">MojiDev group</a>
    </footer>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { mapState, mapActions } from "vuex";
import config from "../../config";

export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      username: null,
      password: null,
    };
  },
  computed: {
    ...mapState("auth", {
      // Helper vuex with spread operator to combine (modules vuex)
      isFetching: (state) => state.isFetching,
      errorMessage: (state) => state.errorMessage,
    }),
  },
  methods: {
    //Spread operator , maps action in store auth.js
    ...mapActions("auth", ["loginUser", "receiveToken", "receiveLogin"]),
    login() {
      this.username = this.$refs.username.value;
      this.password = this.$refs.password.value;

      if (this.username && this.password) {
        // Dispatching action from auth.js store
        this.loginUser({
          username: this.username,
          password: this.password,
        });
      }
    },
  },
  created() {
    const token = this.$route.query.token;
    if (token) {
      this.receiveToken(token);
    } else if (this.isAuthenticated()) {
      this.receiveLogin();
    }
  },
  mounted() {
    const creds = config.auth;
    this.username = creds.username;
    this.password = creds.password;
  },
};
</script>
