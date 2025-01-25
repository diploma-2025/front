<template>
  <AppHeader />
  <v-col class="d-flex overflow-hidden" style="height: 90vh" fluid>
    <AppSchedule/>
    <v-col class="border-md overflow-hidden mt-3 pa-0 rounded">
      <AppUsers v-if="activeTab === 1"/>
      <AppAppointment v-if="activeTab === 2"/>
    </v-col>
  </v-col>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
import AppSchedule from "@/components/AppSchedule.vue";
import AppUsers from "@/components/AppUsers.vue";
import AppAppointment from "@/components/AppAppointment.vue";

export default {
  name: "AppMainPage",
  components: {AppHeader, AppSchedule, AppUsers, AppAppointment},
  computed: {
    activeTab() {
      return this.$store.getters.getActiveTab
    },
  },
}
</script>

<style scoped>
</style>