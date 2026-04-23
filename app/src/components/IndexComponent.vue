<template>
  <div
    class="min-h-screen transition-colors"
    :class="isDark ? 'bg-dark-bg' : 'bg-light-bg'"
  >
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
      <h1 class="text-3xl font-bold text-center" :class="isDark ? 'text-dark-subtle' : 'text-gray-800'">Ollama Chat</h1>
      <p class="text-left" :class="isDark ? 'text-dark-subtle' : 'text-gray-500'">
        Put a question and ask. It will access the local Ollama server to answer.
      </p>
      <div class="flex items-end gap-2">
        <label class="flex-1 min-w-0 flex flex-col gap-1">
          <span class="text-xs" :class="isDark ? 'text-dark-subtle' : 'text-gray-500'">Server DNS</span>
          <input
            v-model="serverDns"
            class="px-3 py-1.5 rounded-lg text-sm border transition-colors focus:outline-none"
            :class="isDark
              ? 'bg-dark-surface text-dark-subtle border-dark-border'
              : 'bg-light-surface text-gray-700 border-light-strong'"
          />
        </label>
        <label class="flex-1 min-w-0 flex flex-col gap-1">
          <span class="text-xs" :class="isDark ? 'text-dark-subtle' : 'text-gray-500'">Model</span>
          <select
            v-model="selectedModel"
            class="px-3 py-1.5 rounded-lg text-sm border transition-colors focus:outline-none h-[34px]"
            :class="isDark
              ? 'bg-dark-surface text-dark-subtle border-dark-border'
              : 'bg-light-surface text-gray-700 border-light-strong'"
          >
            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
          </select>
        </label>
      </div>
      <div
        v-if="modelsError"
        class="flex items-start gap-2 px-3 py-2 rounded-lg border text-sm"
        :class="isDark
          ? 'bg-red-950 text-red-400 border-red-800'
          : 'bg-red-50 text-red-600 border-red-200'"
      >
        <span>⚠</span>
        <span>{{ modelsError }}</span>
      </div>
      <textarea
        v-model="inputText"
        :readonly="!!modelsError || models.length === 0"
        placeholder="Type here..."
        class="w-full h-60 min-h-40 p-3 rounded-lg border resize-y focus:outline-none focus:ring-2 transition-colors"
        :class="!!modelsError || models.length === 0
          ? isDark
            ? 'bg-dark-bg text-dark-subtle border-dark-border cursor-default placeholder-dark-subtle'
            : 'bg-light-surface text-gray-500 border-light-strong cursor-default placeholder-light-subtle'
          : isDark
            ? 'bg-dark-surface text-dark-subtle border-dark-border focus:ring-dark-muted placeholder-dark-subtle'
            : 'bg-light-bg text-gray-800 border-light-strong focus:ring-light-subtle placeholder-light-subtle'"
      ></textarea>
      <div class="flex gap-2">
        <button
          @click="ask"
          :disabled="loading"
          class="flex-1 py-2 rounded-lg transition-colors disabled:opacity-50"
          :class="isDark
            ? 'bg-dark-muted text-dark-subtle hover:bg-dark-border'
            : 'bg-light-subtle text-gray-800 hover:bg-light-muted'"
        >{{ loading ? 'Asking...' : 'Ask' }}</button>
        <button
          @click="cancel"
          :disabled="!loading"
          title="Cancel the current request"
          class="px-3 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :class="isDark
            ? 'bg-dark-surface text-red-400 border border-red-800 hover:bg-red-950'
            : 'bg-light-surface text-red-600 border border-red-200 hover:bg-red-50'"
        >✕</button>
      </div>
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

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import OllamaData from '../OllamaData';
import OllamaClient from '@/OllamaClient';

const inputText = ref('');
const outputText = ref('');
const isDark = ref(document.cookie.split('; ').find(r => r.startsWith('theme='))?.split('=')[1] === 'dark');
const loading = ref(false);
const serverDns = ref(localStorage.getItem('serverDns') ?? 'localhost:11434');
const selectedModel = ref('');
const models = ref<string[]>([]);
const modelsError = ref('');

const ollama = new OllamaData(serverDns.value);
const ollamClient = new OllamaClient(ollama);

async function fetchModels(): Promise<void> {
  try {
    ollamClient.updateHostAndDns(serverDns.value);
    models.value = await ollamClient.getModels();
    selectedModel.value = models.value[0] ?? '';
    modelsError.value = '';
  } catch {
    models.value = [];
    selectedModel.value = '';
    modelsError.value = `Could not reach Ollama at ${ollama.getDnsAndPort()}. Make sure the server is running.`;
  }
}

onMounted(fetchModels);

let dnsDebounce: ReturnType<typeof setTimeout>;
watch(serverDns, (val) => {
  localStorage.setItem('serverDns', val);
  clearTimeout(dnsDebounce);
  dnsDebounce = setTimeout(fetchModels, 3000);
});

function toggleTheme(): void {
  isDark.value = !isDark.value;
  document.cookie = `theme=${isDark.value ? 'dark' : 'light'}; path=/`;
}

function cancel(): void {
  ollamClient.abort();
}

async function ask(): Promise<void> {
  if (!inputText.value.trim() || loading.value) return;
  loading.value = true;
  outputText.value = '';

  try {
    const response = await ollamClient.getResponse(selectedModel.value, inputText.value);

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
        outputText.value += chunk.response ?? '';
      }
    }
  } catch (e: unknown) {
    if ((e as Error).name !== 'AbortError') throw e;
  } finally {
    loading.value = false;
    ollamClient.cleanAbord()
  }
}
</script>
