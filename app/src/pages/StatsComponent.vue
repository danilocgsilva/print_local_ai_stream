<template>
  <div class="min-h-screen transition-colors" :class="isDark ? 'bg-dark-bg' : 'bg-light-bg'">
    <div class="flex flex-col gap-4 p-12 max-w-5xl mx-auto w-full">
      <div class="flex justify-end">
        <button
          @click="toggleTheme"
          class="w-24 shrink-0 py-1.5 rounded-lg text-sm border transition-colors"
          :class="isDark
            ? 'bg-dark-surface text-dark-subtle border-dark-border hover:bg-dark-muted'
            : 'bg-light-surface text-gray-700 border-light-strong hover:bg-light-muted'"
        >{{ isDark ? '☀ Light' : '☾ Dark' }}</button>
      </div>
      <MenuComponent :isDark="isDark"></MenuComponent>
      <h1 class="text-3xl font-bold text-center" :class="isDark ? 'text-dark-subtle' : 'text-gray-800'">
        Chatooha Chat
      </h1>
      <StatsTableComponent :isDark="isDark"></StatsTableComponent>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import MenuComponent from './../components/MenuComponent.vue';
import StatsTableComponent from './../components/StatsTableComponent.vue';

const isDark = ref(document.cookie.split('; ').find(r => r.startsWith('theme='))?.split('=')[1] === 'dark');

function toggleTheme(): void {
  isDark.value = !isDark.value;
  document.cookie = `theme=${isDark.value ? 'dark' : 'light'}; path=/`;
}

</script>