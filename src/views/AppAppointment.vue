<script>
import {format} from "date-fns"
import {uk} from "date-fns/locale"
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  name: "AppAppointment",
  components: {
    VueCal
  },
  methods: {
    format,
    changeDate(direction) {
      const currentDate = new Date(this.$store.getters.getDate)
      currentDate.setDate(currentDate.getDate() + (direction === 'left' ? -1 : 1))
      this.$store.commit('setDate', currentDate)
    }
  },
  computed: {
    week() {
      const dayOfWeek = format(new Date(this.date), 'EEEE', {locale: uk})
      return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    },
    date: {
      get() {
        return this.$store.getters.getDate
      }
    },
    appointment() {
      return this.$store.getters.getAppointments.map((appointment, index) => {
        console.log(appointment)
        const startDate = new Date()
        const [startHour, startMinute] = appointment.startTime.split(':').map(Number)
        startDate.setHours(startHour, startMinute);
        startDate.setSeconds(0)
        startDate.setMilliseconds(0)

        const endDate = new Date()
        const [endHour, endMinute] = appointment.endTime.split(':').map(Number)
        endDate.setHours(endHour, endMinute);
        endDate.setSeconds(0)
        endDate.setMilliseconds(0)

        return {
          start: startDate,
          end: endDate,
          title: appointment.patient.username,
          class: 'leisure'
        };
      })
    }
  }
}
</script>

<template>
  <v-col class="d-flex pa-2 border align-center justify-center">
    <v-col cols="2" class="text-center">
      <h2>{{ week }}</h2>
    </v-col>
    <v-col cols="6" class="d-flex align-center justify-center ga-5">
      <v-btn @click="changeDate('left')" icon large elevation="0">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2 class="text-center">{{ format(new Date(date), 'dd MMM', {locale: uk}) }}</h2>
      <v-btn @click="changeDate('right')" icon large elevation="0">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="2">
      <h2>{{ format(new Date(date), 'yyyy', {locale: uk}) }}</h2>
    </v-col>
  </v-col>
  <vue-cal
      locale="uk"
      :hide-view-selector="true"
      :hide-title-bar="true"
      :selected-date="date"
      :timeFrom="420"
      :timeTo="1140"
      :timeCellHeight="60"
      active-view="day"
      time-format="HH:mm"
      :events="appointment"
      :time-step="30"
      class="rounded"
  />
</template>

<style>
.vuecal__event {
  background-color: #A8D8A1 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  cursor: pointer;
  user-select: none;
}
</style>