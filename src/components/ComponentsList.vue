<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item"></l-text>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {v4 as uuidv4} from 'uuid';
import {TextComponentProps} from '@/defaultProps';
import {ComponentData} from '@/store/editor';
export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ['on-item-click'],
  name: 'component-list',
  setup(props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        name: 'l-text',
        id: uuidv4(),
        props,
      };

      context.emit('on-item-click', componentData);
    };

    return {
      onItemClick,
    };
  },
});
</script>
