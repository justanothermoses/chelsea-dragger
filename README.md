# Chelsea dragger

🎶<br>
**Do-do-do, do-do-do<br>
Do-do-do-do-do-do-do<br>
Do-do-do, do-do... DOOOO ?!?**

You know when you're enjoying the vue and suddenly your good mood is interrupted by the task of implementing drag and drop?<br>
Don't worry! We got you covered.🤝 <br>
Just follow the instructions below and go on with your good-mood-singy-thing! 🎶

**Do-do-do-do-do<br>
Well, you must be a girl with shoes like that<br>
She said, you know me well...**

## install

Install package via

```sh
npm install chelsea-dragger
```

Add it to your vue app vie import and `use()` method of your app instance:

```js
import ChelseaDragger from "chelsea-dragger";
createApp(App).use(ChelseaDragger).mount("#app");
```

## General Usage

The following example use this array of items:

**Note**:
Keep in mind that vue need a unique key in a loop, if the items may be rearranged.
For this reason all items have a unique `id`.

```js
const items = [
  {
    id: 1,
    label: "Some Item",
    listId: 1,
  },
  {
    id: 2,
    label: "Another Item",
    listId: 2,
  },
  {
    id: 3,
    label: "Also an Item",
    listId: 2,
  },
  {
    id: 4,
    label: "One more Item",
    listId: 1,
  },
  {
    id: 5,
    label: "Okay still one more...",
    listId: 1,
  },
];
```

### Drag

To register an Element as draggable, use the directive `v-draggable`.
This directive requires a value, that is passed as a reference to your [callback function and drop event](#drop), when dropped in a Drop Zone.

```js
      <div
         v-for="item in items.filter(item => item.listId === 1)"
         :key="item.id"
         v-draggable="item"
      >
        {{ item.title }}
      </div>
```

### Drop

To define an area, where items can be dropped, use The `DropZone` Component.
You Can just wrap it around any other elements, to mark this area as DropZone.

When an Item is dropped, the DropZone will emit a `drop` event and invoke an optional `callback` property. Both cases receive one argument, which is a **reference** to [the value that was passed when registering a draggable element via `v-directive`](#drag).

The example below shows two lists that update the items listId. The first list uses the `callback` property, the second one the `drop`-event.

```js
    <DropZone :callback="(item) => (item.listId = 1)">
      <div v-draggable="item" v-for="item in items.filter(item => item.listId === 1)" :key="item.id">
        {{ item.label }}
      </div>
    </DropZone>

    <DropZone @drop="(item) => (item.listId = 2)">
      <div v-draggable="item" v-for="item in items.filter(item => item.listId === 2)" :key="item.id">
        {{ item.label }}
      </div>
    </DropZone>
```

### Styles

#### Add base styling

```js
import "chelsea-dragger/style";
```
