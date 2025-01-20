<script>
import {VCalendar} from "vuetify/labs/components"
import {format} from "date-fns"
import {uk} from "date-fns/locale"

export default {
  name: "AppAppointment",
  components: {
    VCalendar
  },
  data() {
    return {
      colors: [
        "#D6E6F2", "#A8D8A1", "#FFE1B3", "#C1A7E6", "#F6D1D1",
        "#B4C9D7", "#F3F4F7", "#F1E1C6", "#D1F0C1", "#B1D4E3",
        "#F1B7B7", "#D0D8E8", "#D8F5D6", "#E3C6B3", "#D6E6E1",
        "#B3D9E8", "#E8E6D3", "#D7D9D1", "#E3E3F4", "#E3D1F5"
      ]
    }
  },
  methods: {
    getColorForIndex(index) {
      return this.colors[index % this.colors.length]
    },
    format,
    intervalFormat(hour) {
      const [hours, minutes] = hour.label.split(":")
      return `${hours}:${minutes}`
    },
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
    uk() {
      return uk
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
          title: `Прийом лікаря #${appointment.userId}`,
          color: this.getColorForIndex(index)
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
  <VCalendar
      view-mode="day"
      :hide-header="true"
      :hide-day-header="true"
      :interval-duration="30"
      :interval-format="intervalFormat"
      :interval-start="15"
      :intervals="21"
      :events="appointment"
  />
</template>

<style scoped>
</style>