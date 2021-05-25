<template>
  <div class="CalendarMonth">
    <header class="CalendarMonth__header">
      <button type="button" @click="skip(-1)">prev</button>
      <h3>{{ monthName }}</h3>
      <button type="button" @click="skip(1)">next</button>
    </header>
    <div class="CalendarMonth__body">
      <div
        v-for="(week, index) in weeks"
        :key="`${week}-${index}`"
        class="CalendarMonth__week">
        <div
          v-for="day in week.days" :key="`${day}-${day.number}`"
          :class="{ 'current-month': day.month === month.format('MM') }"
          class="CalendarMonth__day">
          <span class="CalendarMonth__day-number">{{ day.number }}</span>
          <slot v-bind:day="day" name="day" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data: () => ({
    start: moment().startOf("month"),
    weeks: [],
    month: moment()
  }),
  computed: {
    monthName() {
      return this.month.format("MMM");
    },
  },
  props: {
    events: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    removeTime(date) {
      return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    },
    createWeek(start) {
      const days = [];
      let date = start;
      for (let i = 0; i < 7; i++) {
        days.push({
          date,
          name: date.format("dd").substring(0, 1),
          number: date.format("DD"),
          month: date.format("MM"),
          isToday: date.isSame(new Date(), "day"),
        });

        date = date.clone();
        date.add(1, "day");
      }

      return days
    },
    createMonth(start) {
      const date = this.removeTime(start.clone());
      this.weeks = [];

      this.month = start.startOf('month')

      let monthIndex = date.month();
      let done = false;
      let count = 0;

      while (!done) {
        this.weeks.push({
          days: this.createWeek(date.clone())
        })

        date.add(1, 'week')
        count += 1
        done = count > 2 && monthIndex !== date.month()
        monthIndex = date.month()
      }
    },
    skip(steps) {
      const next = this.start.clone()
      this.removeTime(next.month(next.month() + steps).date(1))
      this.month.month(this.month.month() + steps)
      this.createMonth(next)
    }
  },
  mounted () {
    this.createMonth(this.start.startOf('month'))
  },
};
</script>
<style lang="postcss" scoped>
.CalendarMonth {
  @apply flex w-full flex-col items-stretch;
  @apply min-h-screen;

  &__body {
    @apply flex flex-col items-stretch;
    flex: 1;
  }

  &__header {
    @apply w-full flex justify-between px-8 py-6;
  }

  &__week {
    @apply flex flex-row w-full items-stretch;
    flex: 1;
  }

  &__day {
    @apply border-gray-100 p-2 box-content;

    border-width: 0.02em;
    flex: 1;
  }

  &__day:not(.current-month) {
    @apply bg-gray-100;
  }

  h3 {
    @apply text-xl font-bold;
  }
}
</style>
