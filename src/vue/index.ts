import { App } from "vue";
import { draggable } from "./vDraggable";
import DropZone from "./DropZone.vue";

export default {
  install(app: App) {
    app.directive("draggable", draggable);
    app.component("DropZone", DropZone);
  },
};
