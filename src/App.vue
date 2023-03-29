<template>
  <div v-if="withHeader">
    <a-layout :style="{background: '#fff'}">
      <a-layout-header class="header">
        <router-link to="/">
          <div className="header-icon">
            <img :src="logo" />
            <div className="page-title">Fronto</div>
          </div>
        </router-link>
        <a-space>
          <a-button type="primary" shape="round">预览</a-button>
          <a-button type="primary" shape="round">发布</a-button>
          <a-button type="primary" shape="round">登陆</a-button>
        </a-space>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer v-if="withFooter">Footer</a-layout-footer>
    </a-layout>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useRoute} from 'vue-router';
import logo from './assets/logo.svg';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const route = useRoute();
    const withHeader = computed(() => route.meta.withHeader);
    const withFooter = computed(() => route.meta.withFooter);

    // a: 手机号码的正则怎么写？

    return {
      logo,
      withHeader,
      withFooter,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  height: 35px;
}
.header-icon {
  display: flex;
  width: 100px;
  height: 35px;
}
.page-title {
  margin-left: 8px;
  height: 35px;
  line-height: 35px;
  font-size: 24px;
  font-weight: 800;
}
img {
  width: 35px;
  height: 35px;
}
.header-icon {
  margin-top: 16px;
}
.ant-btn {
  margin-top: 16px;
}
</style>
