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
        <p class="widget-auth-info">Use your email to sign in.</p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="email"
              required
              type="text"
              name="email"
              placeholder="Usuario"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="password"
              required
              type="password"
              name="password"
              placeholder="Contrase~a"
            />
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
          >Olvide mi contrase~na</router-link
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

export default {
  name: "LoginPage",
  components: { Widget },
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    login() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;

      if (email.length !== 0 && password.length !== 0) {
        window.localStorage.setItem("authenticated", true);
        this.$router.push("/app/dashboard");
      }
    },
  },
  created() {
    if (window.localStorage.getItem("authenticated") === "true") {
      this.$router.push("/app/dashboard");
    }
  },
};
</script>
