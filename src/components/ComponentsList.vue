<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item as any)"
    >
      <l-text v-bind="item"></l-text>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {v4 as uuidv4} from 'uuid';
import LText from './LText.vue';
import {TextComponentProps} from '../defaultProps';
import {ComponentData} from '../store/editor';

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits<{
  (event: 'on-item-click', ...args: any[]): void;
}>();

console.log('cuurtre', props.list);

const onItemClick = (props: TextComponentProps) => {
  const componentData: ComponentData = {
    name: 'l-text',
    id: uuidv4(),
    props,
  };

  emit('on-item-click', componentData);
};
</script>
<style scoped lang="less">
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;

  & > * {
    position: static !important;
  }
}
</style>
