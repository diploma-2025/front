<script>
import {DatePicker} from 'v-calendar'
import 'v-calendar/style.css'

export default {
  name: 'AppSchedule',
  components: {DatePicker},
  computed: {
    date: {
      get() {
        return this.$store.getters.getDate
      },
      set(newDate) {
        this.$store.commit('setDate', newDate)
      }
    },
    appointments() {
      return this.$store.getters.getAppointments
    }
  }
}
</script>

<template>
  <v-col cols="2" class="bg-white d-flex flex-column align-center ga-5">
    <DatePicker v-model="date" locale="uk"/>
    <v-col class="d-flex flex-column align-center ga-5 overflow-y-scroll">
      <h3>Прийоми</h3>
      <v-row
          v-for="(app, index) in appointments"
          :key="index"
          class="border-md border-accent rounded d-flex align-center justify-space-evenly"
          style="max-height: 8vh; width: 100%"
      >
        {{app.id}}
      </v-row>
    </v-col>
  </v-col>
</template>

<style scoped>
</style>