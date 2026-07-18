<template>
  <div class="stats-container">
    <h2 class="stats-title">Model Usage Statistics</h2>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading statistics...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <table v-else class="stats-table">
      <thead>
        <tr>
          <th class="count-column">Count</th>
          <th>Model Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in stats" :key="index">
          <td class="count-cell">{{ item.count }}</td>
          <td class="model-cell">{{ item.model }}</td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="stats.length === 0 && !loading && !error" class="no-data">
      <p>No statistics available</p>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';

interface StatItem {
  count: number;
  model: string;
}

const stats = ref<StatItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

defineProps<{
  isDark: boolean;
}>();

// Sample data generator (replace with actual API call)
const generateSampleData = (): StatItem[] => {
  const models = [
    'qwen3-coder:30b', 'qwen2.5-coder:7b', 'gemma3:4b', 
    'codellama:13b', 'gemma4:12b', 'deepseek-r1:7b',
    'deepseek-coder:6.7b', 'deepseek-r1:14b', 'mdq100/qwen3.5-coder:35b',
    'phi3:3.8b', 'llama3.1:8b', 'gpt-oss:20b', 'devstral-small-2:24b',
    'deepseek-v2:16b', 'deepseek-coder-v2:16b', 'mistral:latest',
    'codegemma:7b', 'qwen2.5-coder:32b', 'starcoder:15b',
    'sorc/qwen3.5-claude-4.6-opus:latest', 'codellama:7b-instruct',
    'codegemma:code', 'starcoder:3b', 'cryptidbleh/gemma4-claude-sonnet-4.6:latest',
    'qwen3.6:27b', 'codegemma:7b-code'
  ];
  
  return Array.from({ length: 25 }, (_, i) => ({
    count: Math.floor(Math.random() * 200) + 1,
    model: models[i % models.length]
  })).sort((a, b) => b.count - a.count);
};

const fetchStats = async () => {
  try {
    loading.value = true;
    // Replace with actual API call
    // const response = await fetch('/api/stats');
    // const data = await response.json();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    stats.value = generateSampleData();
    error.value = null;
  } catch (err) {
    error.value = 'Failed to load statistics';
    console.error('Stats fetch error:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStats();
});
</script>

<style scoped>
.stats-container {
  padding: 1.5rem;
  background: v-bind('isDark ? "var(--dark-bg)" : "var(--light-bg)"');
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.stats-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: v-bind('isDark ? "var(--dark-text)" : "var(--light-text)"');
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
  color: v-bind('isDark ? "var(--dark-text)" : "var(--light-text)"');
}

.stats-table thead {
  border-bottom: 2px solid v-bind('isDark ? "var(--dark-border)" : "var(--light-border)"');
}

.stats-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: v-bind('isDark ? "var(--dark-text-secondary)" : "var(--light-text-secondary)"');
}

.stats-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid v-bind('isDark ? "var(--dark-border)" : "var(--light-border)"');
}

.count-column {
  width: 10%;
  text-align: right;
}

.count-cell {
  font-weight: 600;
  color: v-bind('isDark ? "var(--dark-accent)" : "var(--light-accent)"');
}

.model-cell {
  font-family: monospace;
  word-break: break-all;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 2rem;
  color: v-bind('isDark ? "var(--dark-text-secondary)" : "var(--light-text-secondary)"');
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: v-bind('isDark ? "#6b7280" : "#3b82f6"');
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .stats-container {
    padding: 1rem;
  }
  
  .stats-table th,
  .stats-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .count-column {
    width: 15%;
  }
}
</style>