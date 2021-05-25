<template>
  <div class="CalendarMonth">
    <header class="CalendarMonth__header">
      <h3>{{ monthName }}</h3>
    </header>
    <div class="CalendarMonth__body">
      <div
        v-for="(week, index) in weeks"
        :key="`${week}-${index}`"
        class="CalendarMonth__week"
      >
        <div
          v-for="day in week.days"
          :key="`${day}-${day.number}`"
          :class="{ 'current-month': day.month === month.format('MM') }"
          class="CalendarMonth__day"
          @click="$emit('day-clicked', day)"
        >
          <span class="CalendarMonth__day-number">{{ day.number }}</span>
          <div
            v-for="(item, i) in getEvents(day)"
            :key="i"
            class="CalendarMonth__event"
            @click.stop="$emit('edit', item)"
          >
            <span class="swatch" :style="{ backgroundColor: item.color }" />
            <span>{{ item.reminder }} - {{ item.time }}</span>
            <button
              class="remove"
              type="button"
              @click.stop="requestRemove(item)"
            >
              x
            </button>
          </div>
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
    month: moment(),
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
      default: () => [],
    },
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

      return days;
    },
    createMonth(start) {
      const date = this.removeTime(start.clone());
      this.weeks = [];

      this.month = start.startOf("month");

      let monthIndex = date.month();
      let done = false;
      let count = 0;

      while (!done) {
        this.weeks.push({
          days: this.createWeek(date.clone()),
        });

        date.add(1, "week");
        count += 1;
        done = count > 2 && monthIndex !== date.month();
        monthIndex = date.month();
      }
    },
    skip(steps) {
      let next = this.start.clone();
      next = next.add(steps, "months").endOf("month");
      this.createMonth(next.startOf("month"));
    },
    getEvents(day) {
      const date = day.date.format("YYYY-MM-DD");
      this.events.sort((a, b) => a.time.localeCompare(b.time));
      return this.events.filter((item) => item.date.isSame(date));
    },
    requestRemove(event) {
      if (confirm("Are you sure you want to remove this event?")) {
        this.$emit("remove", event);
      }
    },
  },
  mounted() {
    this.createMonth(this.start.startOf("month"));
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
    @apply w-full flex justify-between px-8 py-6 text-center;
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

  &__day-number {
    @apply block;
  }

  &__day:not(.current-month) {
    @apply bg-gray-100;
  }

  &__event {
    @apply py-2 px-1 text-sm flex items-center;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }

  h3 {
    @apply text-xl font-bold;
  }

  .swatch {
    @apply inline-block mr-2;
    border-radius: 4px;
    width: 8px;
    height: 8px;
  }

  .remove {
    @apply bg-gray-300 text-center ml-auto box-content text-gray-600;

    border-radius: 16px;
    width: 22px;
    height: 22px;
    line-height: 100%;
  }
}
</style>
