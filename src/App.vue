<style scoped>
</style>

<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      cachedAppointments: {},
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.name !== 'Auth') {
        this.$store.dispatch("fetchUser", {serverUrl: this.$serverUrl, router: this.$router})
        this.$store.dispatch("fetchAppointments", {serverUrl: this.$serverUrl})
      }
    },
    '$store.state.date': function (newDate, oldDate) {
      if (newDate !== oldDate) {
        this.$store.dispatch("fetchAppointments", {serverUrl: this.$serverUrl});
      }
    }
  }
};
</script>
