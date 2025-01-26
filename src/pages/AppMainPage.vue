<template>
  <AppHeader />
  <v-col class="d-flex overflow-hidden" style="height: 90vh" fluid>
    <AppSchedule/>
    <v-col class="border-md overflow-hidden mt-3 pa-0 rounded">
      <AppUsers v-if="activeTab.id === 1"/>
      <AppAppointment v-if="activeTab.id === 2"/>
    </v-col>
  </v-col>
</template>

<script>
import AppHeader from "@/components/headers/AppHeader.vue"
import AppSchedule from "@/components/headers/AppSchedule.vue";
import AppUsers from "@/components/tabs/AppUsers.vue";
import AppAppointment from "@/components/tabs/AppAppointment.vue";

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