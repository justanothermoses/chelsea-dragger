import { test, expect } from '@playwright/test'
import { port } from '../playwright.config'
import { classes } from '../src/shared'

const items = [
  'Some Item',
  'Another Item',
  'Also an Item',
  'One more Item',
  'Okay still one more...',
]

function getNewListIndex(oldListIndex) {
  if (oldListIndex === 0) return 1
  if (oldListIndex === 1) return 0
  throw new Error('Unknown list index: ' + oldListIndex)
}

function getBoundingBoxCenter(boundingBox) {
  const x = boundingBox.x + boundingBox.width / 2
  const y = boundingBox.y + boundingBox.height / 2
  return { x, y }
}

async function getItemClassArray(item) {
  return item.evaluate((node) => Array.from(node.classList))
}

test('Drag and drop', async ({ page }) => {
  await page.goto(`http://localhost:${port}`)

  const lists = page.locator(`.${classes.dropZone}`)

  async function getItemsList(itemTitle) {
    for (let i = 0; i < (await lists.count()); i++) {
      const content = await lists.nth(i).innerText()
      if (content.includes(itemTitle)) return i
    }
    return -1
  }

  const moveItemToNewList = async (item, newList) => {
    const itemBoundingBoxCenter = getBoundingBoxCenter(await item.boundingBox())
    const newListBoundingBoxCenter = getBoundingBoxCenter(
      await newList.boundingBox()
    )

    await page.mouse.move(itemBoundingBoxCenter.x, itemBoundingBoxCenter.y, {
      steps: 5,
    })
    await page.mouse.down()
    await page.mouse.move(
      newListBoundingBoxCenter.x,
      newListBoundingBoxCenter.y,
      { steps: 5 }
    )

    console.log('Checking if dragging class is added while drag...')
    expect(await getItemClassArray(item)).toContain(classes.draggableIsDragging)

    await page.mouse.up()

    console.log('Checking if dragging class is removed after drop...')
    expect(await getItemClassArray(item)).not.toContain(
      classes.draggableIsDragging
    )
  }

  const testItem = async (itemTitle) => {
    await page.waitForSelector(`.${classes.draggable}`, { hasText: itemTitle })

    console.log(`\n\nProcessing item "${itemTitle}"...`)
    const oldListIndex = await getItemsList(itemTitle)
    const newListIndex = getNewListIndex(oldListIndex)
    console.log(`Item exists in list ${oldListIndex}`)

    const item = page.getByText(itemTitle)

    console.log(`Moving item to list ${newListIndex}...`)
    await moveItemToNewList(item, lists.nth(newListIndex))
    const checkListIndex = await getItemsList(itemTitle)

    console.log(`Checking if item now exists in list ${newListIndex}...`)
    expect(checkListIndex).toEqual(newListIndex)
    console.log(`Done with Item "${itemTitle}".\n`)
  }

  console.log(`\n\nTesting ${items.length} items...`)
  for (const item of items) {
    await testItem(item)
  }
})
