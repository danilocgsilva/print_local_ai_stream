<template>
  <div
    class="min-h-screen transition-colors"
    :class="isDark ? 'bg-dark-bg' : 'bg-light-bg'"
  >
    <div class="flex flex-col gap-4 p-12 max-w-5xl mx-auto w-full">
      <h1 class="text-3xl font-bold text-center" :class="isDark ? 'text-dark-subtle' : 'text-gray-800'">Ollama Chat</h1>
      <div class="flex justify-end">
        <button
          @click="toggleTheme"
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
        @click="ask"
        :disabled="loading"
        class="w-full py-2 rounded-lg transition-colors disabled:opacity-50"
        :class="isDark
          ? 'bg-dark-muted text-dark-subtle hover:bg-dark-border'
          : 'bg-light-subtle text-gray-800 hover:bg-light-muted'"
      >{{ loading ? 'Asking...' : 'Ask' }}</button>
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
import { h } from 'vue';
import { Vue } from 'vue-class-component';

export default class Index extends Vue {
  inputText = '';
  outputText = '';
  isDark = document.cookie.split('; ').find(r => r.startsWith('theme='))?.split('=')[1] === 'dark';
  loading = false;

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.cookie = `theme=${this.isDark ? 'dark' : 'light'}; path=/`;
  }

  async ask(): Promise<void> {
    if (!this.inputText.trim() || this.loading) return;
    this.loading = true;
    this.outputText = '';

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        model: 'gemma3:4b', 
        prompt: this.inputText, 
        stream: true 
      }),
    });

    if (!response.body) return;
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let done = false;
    while (!done) {
      const { done: isDone, value } = await reader.read();
      done = isDone;

      const listOfData = decoder.decode(value).split('\n').filter(Boolean);
      for (const line of listOfData) {
        const chunk = JSON.parse(line);
        this.outputText += chunk.response ?? '';
      }
    }

    this.loading = false;
  }
}
</script>
