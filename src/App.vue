<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="postcss" scoped>
.add-btn {
  @apply bg-blue-500 rounded-full py-3 text-white text-4xl shadow-lg absolute text-center;

  width: 64px;
  height: 64px;
  bottom: 32px;
  right: 32px;
  line-height: 100%;
}
</style>
