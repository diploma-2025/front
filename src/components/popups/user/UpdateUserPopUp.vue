<script>
export default {
  name: "UpdateUserPopUp",
  data() {
    return {
      title: "Редагування ролі",
      localRole: this.role,
      initialRole: this.role
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    username: {
      type: String,
      default: null
    },
    role: {
      type: String,
      required: true
    }
  },
  computed: {
    roles() {
      return this.$store.getters.getRoles;
    },
    isRoleChanged() {
      return this.localRole !== this.initialRole;
    }
  },
  mounted() {
    this.$emit("updateTitle", this.title)
    this.$store.dispatch('fetchData', {serverUrl: this.$serverUrl, path: 'roles', action: 'setRoles'});
  },
  watch: {
    localRole(newRole) {
      this.$emit('update:role', newRole);
    }
  }
}
</script>

<template>
  <v-col class="text-center d-flex flex-column align-center ga-5">
    <h3 class="text-blue-accent-3">{{ username }}</h3>
    <v-select
        :items="roles"
        item-title="name"
        item-value="id"
        variant="outlined"
        label="Роль"
        class="w-75"
        v-model="localRole"
    />
    <v-btn
        color="primary"
        class="w-50 mt-4"
        :disabled="!isRoleChanged"
        @click="this.$store.dispatch('updateData', {
          serverUrl: this.$serverUrl,
          path: 'users',
          body: {
            userId: id,
            roleId: localRole
          },
          action: 'setUsers'
        })"
    >
      Зберегти
    </v-btn>
  </v-col>
</template>
