<script setup>
import { onMounted, ref } from 'vue';
import { fetchAllCards } from '../services/cardService';

const cards = ref([]);
const loadingCards = ref(true);
let page = 0;

async function loadCards() {
  loadingCards.value = true;
  cards.value = await fetchAllCards(page);
  loadingCards.value = false;
}

async function nextPage() {
  page++;
  await loadCards();
}

async function previousPage() {
  if (page > 0) {
    page--;
    await loadCards();
  }
}

onMounted(() => {
  loadCards();
});

</script>

<template>
  <div>
    <h1>Toutes les cartes</h1>
  </div>
  <div class="card-list">
    <div v-if="loadingCards">Loading...</div>
    <div v-else>
      <div class="card-result" v-for="card in cards" :key="card.id">
        <router-link :to="{ name: 'get-card', params: { uuid: card.uuid } }">
          {{ card.name }} <span>({{ card.uuid }})</span>
        </router-link>
      </div>
    </div>
  </div>
  <div class="pagination-controls">
    <button @click="previousPage" :disabled="page === 0">Page précédente</button>
    <span class="page-number">Page {{ page + 1 }}</span>
    <button @click="nextPage">Page suivante</button>
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
}

.page-number {
  font-weight: bold;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
