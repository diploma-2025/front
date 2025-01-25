<template>
  <v-dialog
      v-model="popup.isOpen"
      max-width="400px"
      @after-leave="clearPopupName"
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <h4 class="text-center">{{ title }}</h4>
        <v-btn icon @click="closePopup" elevation="0">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <component
            :is="popup.name"
            v-if="popup.name"
            @updateTitle="updateTitle"
            @closePopup="closePopup"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CreateAppointmentPopUp from "@/popups/appointment/CreateAppointmentPopUp.vue";
import CreateUserPopUp from "@/popups/appointment/CreateUserPopUp.vue";

export default {
  name: "AppMainPopup",
  components: {
    CreateAppointmentPopUp,
    CreateUserPopUp
  },
  data() {
    return {
      title: "Заголовок"
    }
  },
  computed: {
    popup() {
      return this.$store.getters.getPopup
    },
  },
  methods: {
    closePopup() {
      this.$store.commit("setPopup", {isOpen: false, name: this.popup.name})
    },
    clearPopupName() {
      this.$store.commit("clearPopup")
    },
    updateTitle(newTitle) {
      this.title = newTitle
    }
  },
};
</script>
