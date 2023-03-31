<template>
  <div v-if="withHeader">
    <a-layout :style="{background: '#fff'}">
      <a-layout-header class="header">
        <router-link to="/">
          <div class="header-icon">
            <img :src="logo" />
            <div class="page-title">Fronto</div>
          </div>
        </router-link>
        <a-space>
          <template v-if="isEditor">
            <a-button type="primary" shape="round">预览</a-button>
            <a-button type="primary" shape="round">发布</a-button>
          </template>
          <template v-if="isHome">
            <a-button type="primary" shape="round">登录</a-button>
            <!-- <a-button type="primary" shape="round">退出登录</a-button> -->
            <a-button type="danger" @click="showModal" shape="round"
              >AI 模式</a-button
            >
            <a-radio-button
              v-if="language === 'zh'"
              value="zh"
              @click="handleLanguageChange('en')"
              >中文</a-radio-button
            >
            <a-radio-button
              value="en"
              v-if="language === 'en'"
              @click="handleLanguageChange('zh')"
              >English</a-radio-button
            >
            <a-button type="text" shape="circle">
              <template #icon
                ><github-outlined style="font-size: 22px; color: #fff"
              /></template>
            </a-button>
          </template>
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
  <a-modal
    v-model:visible="visible"
    title="ChatAI Bot"
    okText="确定"
    cancelText="取消"
    @ok="handleOk"
  >
    <p>Chat with AI Bot</p>
    <a-textarea placeholder="Ask anything" :rows="3" />
  </a-modal>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import {GithubOutlined} from '@ant-design/icons-vue';
import {OPENAI_API_KEY, ORG_ID} from './constant';
import {Configuration, OpenAIApi} from 'openai';

import logo from './assets/logo.svg';

const route = useRoute();
const visible = ref<boolean>(false);
const language = ref<string>('zh');
const withHeader = computed(() => route.meta.withHeader);
const withFooter = computed(() => route.meta.withFooter);
const isEditor = computed(() => route.meta.isEditor);
const isHome = computed(() => route.meta.isHome);

const getOpenAi = async () => {
  const configuration = new Configuration({
    organization: ORG_ID,
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listEngines();

  console.log(response.data);
};

const handleLanguageChange = (value: string) => {
  console.log(value);
  language.value = value;
};

const showModal = () => (visible.value = true);

const handleOk = () => (visible.value = false);
</script>

<style scoped>
.header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  min-height: 35px;
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
