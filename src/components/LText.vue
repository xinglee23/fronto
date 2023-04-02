<template>
  <component
    :is="tag"
    :style="styleProps"
    class="l-text-component"
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>
<script lang="ts" setup>
import useComponentCommon from '../hooks/useComponentCommon';
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from '../defaultProps';

const defaultProps = transformToComponentProps(textDefaultProps);
const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  ...transformToComponentProps(textDefaultProps),
});

// 重用并且简化
// 抽离并且获得 styleProps
const {styleProps, handleClick} = useComponentCommon(props, textStylePropNames);
</script>

<style scoped lang="less">
h2.l-text-component,
p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
