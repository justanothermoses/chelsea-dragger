<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    id: 1,
    label: 'Some Item',
    listId: 1,
  },
  {
    id: 2,
    label: 'Another Item',
    listId: 2,
  },
  {
    id: 3,
    label: 'Also an Item',
    listId: 2,
  },
  {
    id: 4,
    label: 'One more Item',
    listId: 1,
  },
  {
    id: 5,
    label: 'Okay still one more...',
    listId: 1,
  },
])

const getItemsByList = (listId: number) =>
  items.value.filter((item) => item.listId === listId)
</script>

<template>
  <div>
    <h1>Chelsea Dragger</h1>

    <div class="lists">
      <div class="lists__list">
        <h2>Some List</h2>
        <DropZone :callback="(item) => (item.listId = 1)">
          <div
            v-draggable="item"
            v-for="item in getItemsByList(1)"
            :key="item.id"
          >
            {{ item.label }}
          </div>
        </DropZone>
      </div>

      <div class="lists__list">
        <h2>Some other list</h2>
        <DropZone @drop="(item) => (item.listId = 2)">
          <div
            v-draggable="item"
            v-for="item in getItemsByList(2)"
            :key="item.id"
          >
            {{ item.label }}
          </div>
        </DropZone>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.chelsea-dragger__drop-zone {
  min-height: 3em;
  background-color: #646cff;
  padding: 2em;
  border-radius: 0.5em;
}

.chelsea-dragger__draggable {
  border-radius: 0.3em;
  background-color: #eee;
  color: #242424;
  padding: 0.7em;
  margin: 0.8em 0;
  text-align: center;
}

.lists {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  gap: 4em;

  & .lists__list {
    flex-basis: 45%;
    flex-grow: 1;
    flex-shrink: 0;
  }
}
</style>
