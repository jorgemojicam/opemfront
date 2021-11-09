<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    const currentPath = this.$router.history.current.path;

  let autenticated =window.localStorage.getItem("authenticated");

    // eslint-disable-next-line no-console


    if (autenticated===null || autenticated === "false") {
      this.$router.push("/login");
    }

    if (currentPath === "/" || currentPath === "/app") {
      this.$router.push("/app/dashboard");
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
