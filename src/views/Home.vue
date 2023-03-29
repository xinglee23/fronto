<template>
  <div class="content-container">
    <a-row :gutter="16">
      <template-list :list="testData"></template-list>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button
        type="primary"
        size="large"
        @click="loadMorePage"
        v-if="!isLastPage"
        :loading="isLoading"
        >加载更多</a-button
      >
    </a-row>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue';
import {useStore} from 'vuex';
import {GlobalDataProps} from '../store';
import useLoadMore from '../hooks/useLoadMore';

export default defineComponent({
  components: {},
  setup() {
    const store = useStore<GlobalDataProps>();

    const testData = computed(() => store.state.templates.data);
    const total = computed(() => store.state.templates.totalTemplates);
    const isLoading = computed(() =>
      store.getters.isOpLoading('fetchTemplates')
    );
    const {loadMorePage, isLastPage} = useLoadMore('fetchTemplates', total, {
      pageIndex: 0,
      pageSize: 4,
    });

    console.log('test data', testData.value);

    onMounted(() => {
      store.dispatch('fetchTemplates', {
        pageIndex: 0,
        pageSize: 4,
      });
    });

    return {
      isLastPage,
      isLoading,
      testData,
      loadMorePage,
    };
  },
});
</script>

<style>
.page-title {
  color: #fff;
}
.content-container {
  width: 100%;
}
</style>
