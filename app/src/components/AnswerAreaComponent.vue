<template>

  <textarea :value="outputText" readonly placeholder="Output will appear here..."
    class="w-full h-96 p-3 rounded-lg border resize-none cursor-default transition-colors" :class="isDark
      ? 'bg-dark-bg text-dark-subtle border-dark-border placeholder-dark-subtle'
      : 'bg-light-surface text-gray-500 border-light-strong placeholder-light-subtle'"></textarea>

</template>

<script setup lang="ts">

defineProps<{
  outputText: string,
  isDark: boolean
}>();

</script>