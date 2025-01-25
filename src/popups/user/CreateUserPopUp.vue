<script>
export default {
  name: "CreateUserPopUp",
  data() {
    return {
      title: 'Створити користувача',
      form: {
        email: null,
        username: null,
        role: null,
      },
      errors: {
        emailErrors: false,
        usernameErrors: false,
        roleErrors: false,
      },
    }
  },
  methods: {
    submitForm() {
      this.errors.emailErrors = !this.form.email
      this.errors.usernameErrors = !this.form.username
          || !/^[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+\s[А-ЯІЇЄ][а-яіїє']+$/u.test(this.form.username)
      this.errors.roleErrors = !this.form.roleErrors

      console.log("aasdasdas")
      if (!this.errors.emailErrors && !this.errors.usernameErrors && !this.errors.roleErrors)
        console.log("bbbbb")
        this.$store.dispatch('createData', {
          serverUrl: this.$serverUrl,
          path: 'user',
          body: {
            email: this.form.email,
            username: this.form.username,
            roleId: this.form.role,
          },
          callBackName: 'fetchUsers',
        }).then(() => {
          this.$emit('closePopup')
        })
    },
  },
  computed: {
    roles: {
      get() {
        return  this.$store.getters.getRoles
      }
    }
  },
  mounted() {
    this.$emit("updateTitle", this.title)
    this.$store.dispatch('fetchRoles', {serverUrl: this.$serverUrl})
  },
}

</script>

<template>
  <v-form class="d-flex flex-column align-center ga-5" @submit.prevent="submitForm">
    <v-text-field
        label="ПІБ"
        variant="outlined"
        type="text"
        class="w-75"
        v-model="form.username"
        :error-messages="errors.usernameErrors ? ['Вкажіть коректно ПІБ']: []"
    />
    <v-text-field
        label="Пошта"
        variant="outlined"
        type="email"
        class="w-75"
        v-model="form.email"
        :error-messages="errors.emailErrors ? ['Вкажіть пошту'] : []"
    />
    <v-select
        :items="roles"
        item-title="name"
        item-value="id"
        variant="outlined"
        label="Роль"
        class="w-75"
        v-model="form.role"/>
    <v-btn type="submit" color="primary" class="mt-4 w-25">
      Зберегти
    </v-btn>
  </v-form>
</template>

<style scoped>

</style>