<template>
  <v-app-bar app elevation="0">
    <v-row class="d-flex align-center justify-space-around" no-gutters>
      <v-btn
          color="black"
          class="font-weight-bold"
          size="large"
          style="margin-left: -28px;"
          elevation="3"
      >
        Записати
      </v-btn>
      <v-col v-if="user?.tabs?.length" cols="5" class="d-flex justify-center ga-5">
        <v-btn v-for="tab in user.tabs" :key="tab.id"
               :class="{ 'v-btn--active': activeTab === tab.id }"
               @click="setActiveTab(tab.id)"
        >
          {{ tab.name }}
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-menu v-model="menu" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <span>{{ user?.username }}</span>
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="handleClick('Налаштування')">
              <v-list-item-title>Налаштування</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleClick('Вийти')">
              <v-list-item-title class="text-red">Вийти</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'

export default {
  name: 'AppHeader',
  setup() {
    const store = useStore()
    const menu = ref(false)

    const setActiveTab = (id) => {
      store.commit('setActiveTab', id)
    }

    const handleClick = item => console.log(`Вибрано: ${item}`)

    const switchCalendar = value => store.commit('setCalendar', value)

    return {menu, setActiveTab, handleClick, switchCalendar}
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    activeTab() {
      return this.$store.getters.getActiveTab
    }
  },
}
</script>

<style scoped>
.v-btn--active {
  background-color: lightblue;
}
</style>
