<template>
  <div class="content-container">
    <a-row :gutter="16">
      <template-list :list="testData"></template-list>
    </a-row>
    <a-row type="flex" justify="center">
      <router-link to="/editor">
        <a-button type="primary" size="large">使用模版</a-button>
      </router-link>
    </a-row>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRoute} from 'vue-router';

export default defineComponent({
  components: {},
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>

<style>
.page-title {
  color: #fff;
}
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>
