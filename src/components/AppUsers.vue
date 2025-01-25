<script>
export default {
  name: "AppUsers",
  data() {
    return {
      search: null,
      headers: [
        {title: 'ПІБ', value: 'username'},
        {title: 'Пошта', value: 'email'},
        {title: 'Роль', value: 'role'},
        {title: 'Дії', key: 'actions', align: 'center', sortable: false},

      ]
    }
  },
  computed: {
    users: {
      get() {
        const users = this.$store.getters.getUsers
        if (!this.search) return users
        const searchLower = this.search.toLowerCase()
        return users.filter(user => {
          return Object.keys(user).some(key => {
            if (user[key]) {
              return user[key].toString().toLowerCase().includes(searchLower);
            }
            return false;
          })
        })
      }
    }
  },
  methods: {
    test(id) {
      console.log(id)
    }
  }
  ,
  mounted() {
    this.$store.dispatch("fetchUsers", {serverUrl: this.$serverUrl})
  }
}
</script>
<template>
  <v-row>
    <v-col>
      <v-text-field
          variant="solo"
          flat
          v-model="search"
          label="Шукати"
          hide-details
          prepend-inner-icon="mdi-magnify"
      />
    </v-col>
    <v-col class="mt-1 text-end mr-3" cols="1">
      <v-btn icon @click="this.$store.commit('setPopup', {isOpen: true, name:'CreateUserPopUp'})" color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-data-table-virtual :items="users" :headers="headers" class="h-100" :fixed-header="true">
    <template v-slot:[`item.actions`]="{item}">
      <v-col>
        <v-btn icon elevation="0" @click="test(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon elevation="0" @click="test(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </template>
  </v-data-table-virtual>
</template>

<style scoped>

</style>