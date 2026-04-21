<template>
  <div
    class="min-h-screen transition-colors"
    :class="isDark ? 'bg-dark-bg' : 'bg-light-bg'"
  >
    <div class="flex flex-col gap-4 p-12 max-w-5xl mx-auto w-full">
      <div class="flex justify-end">
        <button
          @click="isDark = !isDark"
          class="px-4 py-1.5 rounded-lg text-sm border transition-colors"
          :class="isDark
            ? 'bg-dark-surface text-dark-subtle border-dark-border hover:bg-dark-muted'
            : 'bg-light-surface text-gray-700 border-light-strong hover:bg-light-muted'"
        >{{ isDark ? '☀ Light' : '☾ Dark' }}</button>
      </div>
      <textarea
        v-model="inputText"
        placeholder="Type here..."
        class="w-full h-40 p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 transition-colors"
        :class="isDark
          ? 'bg-dark-surface text-dark-subtle border-dark-border focus:ring-dark-muted placeholder-dark-subtle'
          : 'bg-light-bg text-gray-800 border-light-strong focus:ring-light-subtle placeholder-light-subtle'"
      ></textarea>
      <button
        class="w-full py-2 rounded-lg transition-colors"
        :class="isDark
          ? 'bg-dark-muted text-dark-subtle hover:bg-dark-border'
          : 'bg-light-subtle text-gray-800 hover:bg-light-muted'"
      >Ask</button>
      <textarea
        :value="outputText"
        readonly
        placeholder="Output will appear here..."
        class="w-full h-96 p-3 rounded-lg border resize-none cursor-default transition-colors"
        :class="isDark
          ? 'bg-dark-bg text-dark-subtle border-dark-border placeholder-dark-subtle'
          : 'bg-light-surface text-gray-500 border-light-strong placeholder-light-subtle'"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Index extends Vue {
  inputText = '';
  outputText = '';
  isDark = false;
}
</script>
