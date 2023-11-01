<script setup lang="ts">
import { getAndRemoveFromStore, classes } from '../shared'

const emit = defineEmits(['drop'])

const { callback } = defineProps({
  callback: {
    type: Function,
    required: false,
  },
})

const onDrop = (event: DragEvent) => {
  if (!event.dataTransfer) return
  const storeIdentifier = event.dataTransfer.getData('identifier')
  const data = getAndRemoveFromStore(storeIdentifier)

  emit('drop', data)
  if (callback) callback(data)
}
</script>

<template>
  <div
    :class="classes.dropZone"
    @drop="onDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <slot />
  </div>
</template>
