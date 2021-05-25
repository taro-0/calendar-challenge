<template>
  <div class="home">
    <calendar
      :events="events"
      @day-clicked="newEvent"
      @edit="editEvent"
      @remove="removeEvent"
    />

    <div v-if="showModal" class="home__modal">
      <div class="home__modal-body">
        <ReminderForm
          v-model="currentEvent"
          @save="saveEvent"
          @cancel="hideModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Calendar from "@/components/Calendar.vue";
import ReminderForm from "@/components/ReminderForm.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    ReminderForm,
  },
  data: () => ({
    showModal: false,
    mode: "create",
    currentEvent: {},
  }),
  computed: {
    ...mapState({
      events: (state) => state.events,
    }),
  },
  methods: {
    newEvent(day) {
      this.mode = "create";
      this.currentEvent = {
        date: day.date,
      };
      this.showModal = true;
    },
    editEvent(event) {
      this.currentEvent = Object.assign({}, event);
      this.mode = "edit";
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
    saveEvent(event) {
      if (this.mode === "create") {
        this.$store.dispatch("addEvent", event);
      }

      if (this.mode === "edit") {
        this.$store.dispatch("updateEvent", event);
      }

      this.hideModal();
    },

    removeEvent(event) {
      this.$store.dispatch("removeEvent", event.index);
    },
  },
};
</script>
<style lang="postcss" scoped>
.home {
  &__modal {
    @apply absolute w-screen h-screen flex items-center justify-center;

    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
  }

  &__modal-body {
    @apply bg-white p-4 rounded-lg;
    width: 96.5%;
    max-width: 525px;
  }
}
</style>
