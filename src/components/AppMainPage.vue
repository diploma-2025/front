<template>
  <AppHeader />
  <v-col class="h-100 d-flex overflow-hidden" fluid>
    <AppSchedule/>
    <v-col style="height: 80vh">
      <AppUsers v-if="activeTab === 1"/>
      <AppAppointment v-if="activeTab === 2"/>
    </v-col>
  </v-col>
</template>

<script>
import AppHeader from "@/views/AppHeader.vue"
import AppSchedule from "@/views/AppSchedule.vue";
import AppUsers from "@/views/AppUsers.vue";
import AppAppointment from "@/views/AppAppointment.vue";

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