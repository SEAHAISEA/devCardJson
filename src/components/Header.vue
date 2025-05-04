<template>

  <div class="w-full">

    <div class="flex justify-between items-center p-7 bg-black text-white ">
      <!-- GitHub Button -->
      <button @click="goToGithub" class="text-xl duration-300 drop-shadow-2xl">
        Github
      </button>

      <!-- Language Switcher -->
      <div class="relative">
        <button class="text-xl" @click="toggleLanguageMenu">
          {{ 'Language' }}
        </button>
        <div v-if="isLanguageMenuOpen"
          class="absolute right-0 mt-2 bg-black border border-gray-700 rounded-md shadow-lg">
          <button class="block w-20 h-10 px-4 py-2 hover:bg-gray-700" @click="setLanguage('en')">
            {{ 'English' }}
          </button>
          <button class="block w-20 h-10 px-4 py-2 hover:bg-gray-700" @click="setLanguage('zh')">
            {{ '中文' }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center p-1">
      <h1 class="text-2xl font-bold">{{ titleH1 }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useLanguageStore } from '../stores/language';

const store = useLanguageStore();

let titleH1 = ref(store.headerVueTitleH1.titleH1)


const isLanguageMenuOpen = ref(false);
const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
};


const setLanguage = (lang: string) => {
  isLanguageMenuOpen.value = false;
  store.setLanguage(lang)
};

watch(() => store.headerVueTitleH1,
  (headerVueTitleH1) => {
    titleH1.value = headerVueTitleH1.titleH1
  },{deep:true}
)




// 跳转到 GitHub 的方法
const goToGithub = () => {
  window.open('https://github.com/SEAHAISEA/devCardJson', '_blank'); // 在新标签页中打开 GitHub
};

</script>