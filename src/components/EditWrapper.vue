<template>
  <div
    class="edit-wrapper"
    ref="editWrapper"
    :style="styles"
    :data-component-id="id"
    @mousedown="startMove"
    @click="onItemClick(id)"
    :class="{
      active,
      hidden,
    }"
  >
    <slot></slot>
    <div class="resizers">
      <div
        class="resizers top-left"
        @mousedown.stop="($event) => startResize('top-left')"
      ></div>
      <div
        class="resizers top-right"
        @mousedown.stop="($event) => startResize('top-right')"
      ></div>
      <div
        class="resizers bottom-left"
        @mousedown.stop="($event) => startResize('bottom-left')"
      ></div>
      <div
        class="resizers bottom-right"
        @mousedown.stop="($event) => startResize('bottom-right')"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, nextTick, computed} from 'vue';
import {pick} from 'lodash-es';

type ResizeDirection =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
interface OriginalPositions {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    props: {
      type: Object,
    },
  },
  emits: ['set-active', 'update-position'],
  setup(props, context) {
    const editWrapper = ref<null | HTMLElement>(null);
    const onItemClick = (id: string) => {
      context.emit('set-active', id);
    };
    const gap = {
      x: 0,
      y: 0,
    };
    let isMoving = false;
    const styles = computed(() =>
      pick(props.props, ['position', 'top', 'left', 'width', 'height'])
    );
    const caculateMovePosition = (e: MouseEvent) => {
      const container = document.getElementById('canvas-area') as HTMLElement;
      const left = e.clientX - gap.x - container?.offsetLeft;
      const top = e.clientY - gap.y - container.offsetTop + container.scrollTop;
      return {
        top,
        left,
      };
    };
    const caculateSize = (
      direction: ResizeDirection,
      e: MouseEvent,
      positions: OriginalPositions
    ) => {
      const {clientX, clientY} = e;
      const {left, right, top, bottom} = positions;
      const container = document.getElementById('canvas-area') as HTMLElement;
      const rightWidth = clientX - left;
      const leftWidth = right - clientX;
      const bottomHeight = clientY - top;
      const topHeight = bottom - clientY;
      const topOffset = clientY - container.offsetTop + container.scrollTop;
      const leftOffset = clientX - container.offsetLeft;
      switch (direction) {
        case 'top-left':
          return {
            width: leftWidth,
            height: topHeight,
            top: topOffset,
            left: leftOffset,
          };
        case 'top-right':
          return {
            width: rightWidth,
            height: topHeight,
            top: topOffset,
          };
        case 'bottom-left':
          return {
            width: leftWidth,
            height: bottomHeight,
            left: leftOffset,
          };
        case 'bottom-right':
          return {
            width: rightWidth,
            height: bottomHeight,
          };
        default:
          break;
      }
    };

    const startResize = (direction: ResizeDirection) => {
      const currentElement = editWrapper.value as HTMLElement;
      const {left, right, top, bottom} = currentElement.getBoundingClientRect();
      const handleMove = (e: MouseEvent) => {
        const size = caculateSize(direction, e, {left, right, top, bottom});
        const {style} = currentElement;
        if (size) {
          style.width = `${size.width}px`;
          style.height = `${size.height}px`;
          if (size.left) {
            style.left = `${size.left}px`;
          }
          if (size.top) {
            style.top = `${size.top}px`;
          }
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', handleMove);
        const size = caculateSize(direction, e, {left, right, top, bottom});
        context.emit('update-position', {
          ...size,
          id: props.id,
        });
        nextTick(() => {
          document.removeEventListener('mouseup', handleMouseUp);
        });
      };
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const startMove = (e: MouseEvent) => {
      const currentElement = editWrapper.value as HTMLElement;
      if (currentElement) {
        const {left, top} = currentElement.getBoundingClientRect();
        gap.x = e.clientX - left;
        gap.y = e.clientY - top;
      }
      const handleMove = (e: MouseEvent) => {
        const {left, top} = caculateMovePosition(e);
        isMoving = true;
        if (currentElement) {
          currentElement.style.left = `${left}px`;
          currentElement.style.top = `${top}px`;
        }
      };
      const handleMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', handleMove);

        if (isMoving) {
          const {left, top} = caculateMovePosition(e);
          context.emit('update-position', {
            left,
            top,
            id: props.id,
          });
          isMoving = false;
        }
        nextTick(() => {
          document.removeEventListener('mouseup', handleMouseUp);
        });
      };
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    return {
      editWrapper,
      onItemClick,
      styles,
      startMove,
      startResize,
    };
  },
});
</script>
<style scoped lang="less">
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: content-box !important;
}
.edit-wrapper > * {
  position: static !important;
  width: 100% !important;
  height: 100% !important;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.hidden {
  display: none;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
.edit-wrapper .resizers {
  display: none;
}
.edit-wrapper.active .resizers {
  display: block;
}
.edit-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #1890ff;
  position: absolute;
}
.edit-wrapper .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize;
}
.edit-wrapper .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>
