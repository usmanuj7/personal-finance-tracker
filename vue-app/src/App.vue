<template>
  <div class="app">
    <Sidebar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { useTransactionStore } from './stores/transactionStore'
import { useCategoryStore } from './stores/categoryStore'

const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()

onMounted(() => {
  transactionStore.fetchTransactions()
  categoryStore.fetchCategories()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .app {
    flex-direction: column;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
