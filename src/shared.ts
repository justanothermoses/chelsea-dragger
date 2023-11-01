type StoreValue = String | Number | Function | Object

type StoreIdentifier = string

type Store = {
  [key: StoreIdentifier]: StoreValue
}

const store: Store = {}

export const classes = {
  dropZone: 'chelsea-dragger__drop-zone',
  draggable: 'chelsea-dragger__draggable',
  draggableIsDragging: 'chelsea-dragger__draggable--dragging',
}

const commitToStore = (identifer: StoreIdentifier, ref: StoreValue): void => {
  if (store[identifer])
    throw new Error('Store already contains this identifier.')
  store[identifer] = ref
}

export const getAndRemoveFromStore = (
  identifier: StoreIdentifier
): StoreValue => {
  const value = store[identifier]
  delete store[identifier]
  return value
}

const onDragstart = (
  event: DragEvent,
  el: HTMLElement,
  ref: StoreValue
): void => {
  el.classList.add(classes.draggableIsDragging)
  if (!event?.dataTransfer) return

  event.dataTransfer.dropEffect = 'move' //visual Feedback
  event.dataTransfer.effectAllowed = 'move' // move instead copy

  const identifier = `${event.timeStamp}`
  commitToStore(identifier, ref)
  event.dataTransfer.setData('identifier', identifier)
}

const onDragend = (_event: DragEvent, el: HTMLElement): void => {
  el.classList.remove(classes.draggableIsDragging)
}

export const registerDragger = (el: HTMLElement, ref: StoreValue): void => {
  el.classList.add(classes.draggable)
  el.draggable = true

  el.addEventListener('dragstart', (event: DragEvent) =>
    onDragstart(event, el, ref)
  )
  el.addEventListener('dragend', (event: DragEvent) => onDragend(event, el))
}
