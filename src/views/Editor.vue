<template>
  <div class="editor-container">
    <div class="left">
      <component-list
        :list="defaultTextTemplates"
        @on-item-click="addItem"
      ></component-list>
      <img id="test-image" :style="{width: '300px'}" />
    </div>
    <div class="center">
      <div
        class="preview-list"
        id="canvas-area"
        :class="{'canvas-fix': canvasFix}"
      >
        <div class="body-container" :style="page.props">
          <edit-wrapper
            @setActive="setActive"
            @update-position="updatePosition"
            v-for="component in components"
            :key="component.id"
            :id="component.id"
            :hidden="component.isHidden"
            :props="component.props"
            :active="component.id === currentElement?.id"
          >
            {{ component.name }}}
            <component :is="component.name" v-bind="component.props" />
          </edit-wrapper>
        </div>
      </div>
    </div>
    <div class="right">设置面板</div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useStore} from 'vuex';
import {ComponentData} from '../store/editor';
import ComponentList from '../components/ComponentsList.vue';
import defaultTextTemplates from '../defaultTemplates';
import EditWrapper from '../components/EditWrapper.vue';
import {GlobalDataProps} from '../store';
import {pickBy} from 'lodash';

const store = useStore<GlobalDataProps>();
const canvasFix = ref<boolean>(false);
const page = computed(() => store.state.editor.page);
const components = computed(() => store.state.editor.components);
const currentElement = computed<ComponentData | null>(
  () => store.getters.getCurrentElement
);

console.log('components', store.state.editor.components);

const setActive = (id: string) => {
  store.commit('setActive', id);
};

const addItem = (component: any) => {
  console.log('onItemClick1233', component);
  store.commit('addComponent', component);
};

const updatePosition = (data: {left: number; top: number; id: string}) => {
  const {id} = data;
  const updateData = pickBy<number>(data, (value, key) => key !== 'id');
  const keysArr = Object.keys(updateData);
  const valuesArr = Object.values(updateData).map((v) => `${v}px`);

  store.commit('updatePosition', {key: keysArr, value: valuesArr, id});
};
</script>
<style scoped lang="less">
.editor-container {
  display: flex;
  color: #fff;
  height: 100vh;
  background-color: #e5e5e5;

  .left {
    padding-top: 20px;
    color: blue;
    width: 320px;
    height: 100%;
    background-color: #fff;
  }

  .center {
    position: relative;
    padding: 30px;
    width: 100%;
    color: black;
    background-color: #e5e5e5;
    overflow: hidden;

    .preview-list {
      padding: 0;
      margin: 0;
      min-height: 200px;
      min-width: 800px;
      border: 1px solid #efefef;
      background: #fff;
      overflow-x: hidden;
      overflow-y: auto;
      position: fixed;
      margin-top: 50px;
      max-height: 80vh;

      .canvas-fix,
      .edit-wrapper > * {
        box-shadow: none !important;
      }

      .canvas-fix {
        position: absolute;
        max-height: none;
      }
    }
  }

  .right {
    width: 430px;
    height: 100%;
    background-color: #fff;
  }
}
</style>
