<template>
  <ValidationObserver ref="form" tag="form" class="ReminderForm">
    <fieldset class="ReminderForm__body">
      <h4>Reminder</h4>
      <ValidationProvider rules="max:30|required" v-slot="{ errors }" name="reminder">
        <div class="ReminderForm__input">
          <VSwatches
            v-model="event.color"
            shapes="circles"
            :class="{ 'ReminderForm__input--error': errors.length > 0 }"
          />
          <label for="">Color</label>
        </div>
      </ValidationProvider>
      <ValidationProvider rules="max:30|required" v-slot="{ errors }" name="reminder">
        <div class="ReminderForm__input">
          <label for="reminder">Reminder</label>
          <input
            v-model="event.reminder"
            id="reminder"
            type="text"
            placeholder="What do you need to remember?"
            :class="{ 'ReminderForm__input--error': errors.length > 0 }"
          />
          <span class="ReminderForm__error-message"> {{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider rules="required" v-slot="{ errors }" name="location">
        <div class="ReminderForm__input">
          <label for="location">Location</label>
          <input
            id="location"
            v-model="event.location"
            type="text"
            placeholder="Where will you be by then?"
            :class="{ 'ReminderForm__input--error': errors.length > 0 }"
          />
          <span class="ReminderForm__error-message"> {{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider rules="required" v-slot="{ errors }" name="time">
        <div class="ReminderForm__input">
          <label for="timer">Time</label>
          <TimePicker
            v-model="event.time"
            type="minute"
            btn-str="Ok"
            placeholder="Choose time"
            :time-str="[ 'Hour', 'Minutes', 'Seconds' ]"
            :class="{ 'ReminderForm__input--error': errors.length > 0 }"
          />
          <span class="ReminderForm__error-message"> {{ errors[0] }}</span>
        </div>
      </ValidationProvider>
    </fieldset>
    <button type="button" class="ReminderForm__btn">
      Ok
    </button>
    <button type="button" class="ReminderForm__btn ReminderForm__btn--cancel">
      Cancel
    </button>
  </ValidationObserver>
</template>
<script>
export default {
  data: () => ({
    event: {}
  })
}
</script>
<style lang="postcss" scoped>
.ReminderForm {
  &__body {
    @apply flex flex-col;
  }

  &__btn {
    @apply px-4 py-2 rounded-full text-white font-bold bg-blue-700 ml-auto;
    min-width: 140px;
    outline: none;
  }

  &__btn--cancel {
    @apply bg-gray-200 text-gray-400 ml-3;
  }

  &__input {
    @apply flex flex-col w-full pt-8 relative mb-6;
  }

  &__error-message {
    @apply text-red-400;
  }

  input {
    @apply text-xl block w-full border-gray-400;

    outline: none;
    border-bottom: 1px solid;

    &:focus {
      @apply border-blue-400;

      border-bottom-width: 2px;	
    }
  }

  &__input &__input--error {
    @apply border-red-400;

    border-bottom-width: 2px;	
  }

  label {
    @apply text-sm;
    position: absolute;
    top: 4px
  }

  h4 {
    @apply font-bold text-2xl mb-3;
  }
}
</style>
<style lang="postcss">
.timepicker {
  .input-wrapper {
    @apply pt-3 pb-4;

    border-width: 0px;
    border-bottom-width: 2px;
  } 
}
</style>