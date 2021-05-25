<template>
  <div class="home">
    <calendar />

    <div v-if="showModal" class="home__modal">
      <div class="home__modal-body">
        <ReminderForm />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from "@/components/Calendar.vue";
import ReminderForm from "@/components/ReminderForm.vue"

export default {
  name: "Home",
  components: {
    Calendar,
    ReminderForm,
  },
  data: () => ({
    showModal: false
  })
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
