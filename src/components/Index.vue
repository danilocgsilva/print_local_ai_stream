<template>
  <div class="flex flex-col gap-4 p-12 max-w-5xl mx-auto w-full">
    <textarea
      v-model="inputText"
      placeholder="Type here..."
      class="w-full h-40 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
    ></textarea>
    <button class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Ask</button>
    <textarea
      :value="outputText"
      readonly
      placeholder="Output will appear here..."
      class="w-full h-96 p-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 resize-none cursor-default"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Index extends Vue {
  inputText = '';
  outputText = '';
}
</script>
