import { Directive } from 'vue'
import { registerDragger } from '../shared'

export const draggable: Directive = {
  mounted(el: HTMLElement, binding: any) {
    if (!binding.value)
      throw new Error(
        'No value found.\n Make sure to add a value to `v-draggable` directive'
      )
    registerDragger(el, binding.value)
  },
}
