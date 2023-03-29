<template>
  <div class="editor-wrapper">
    <a-row class="row-wrapper" type="flex" justify="center">
      <a-col :span="6">
        <div class="left">
          <a-tabs centered v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="文本">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="2" tab="图文" force-render
              >Content of Tab Pane 2</a-tab-pane
            >
            <a-tab-pane key="3" tab="形状">Content of Tab Pane 3</a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col class="center" :span="12">画布</a-col>
      <a-col class="right" :span="6">设置面板</a-col>
    </a-row>
    <a-dropdown>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="login">login</a-menu-item>
          <a-menu-item @click="logout"> logout </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue';
import {useStore} from 'vuex';
import {message} from 'ant-design-vue';
import {useRouter} from 'vue-router';
import EditWrapper from '../components/EditWrapper.vue';

export default defineComponent({
  components: {
    EditWrapper,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const login = () => {
      store.commit('login');
      message.success('login success', 2);
    };
    const logout = () => {
      store.commit('logout');
      router.push('/');
    };

    return {
      login,
      logout,
    };
  },
});
</script>
<style scoped lang="less">
.editor-wrapper {
  color: #fff;
  height: 100%;

  .row-wrapper {
    height: 80vh;
  }

  .left {
    padding: 20px;
  }
  .left,
  .right {
    color: #000;
    background: #fff;
  }
  .center {
    background: #f0f2f5;
  }
}
</style>
