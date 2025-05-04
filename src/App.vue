<template>
  <div class="bg-black text-white h-full w-full" :class="isPC ? '' : 'scale-75'">
    <Header />

    <div class="flex items-center justify-center">
      <BusinessCard />
    </div>

    <div v-if="showInput" class="overlay">
      <div class="positionCenter">
        <Field />
      </div>
    </div>


    <div v-if="showIcons" class="overlay">
      <div class="positionCenter">
        <IconSelector />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import Header from './components/Header.vue';
import BusinessCard from './components/BusinessCard.vue';
import Field from './components/Field.vue';
import IconSelector from './components/IconSelector.vue';


import { useFieldStore } from './stores/field';
import { useIconsStore } from './stores/icons';

const iconsStore = useIconsStore();
const fieldStore = useFieldStore();

let isPC = ref(true)

let showIcons = ref(iconsStore.showSelectedIconsBlock)
let showInput = ref(fieldStore.showFieldInputBlock)

watch(() => fieldStore.showFieldInputBlock,
  (showFieldInputBlock) => {
    showInput.value = showFieldInputBlock
  }, { deep: true }
)

watch(() => iconsStore.showSelectedIconsBlock,
  (showSelectedIconsBlock) => {
    showIcons.value = showSelectedIconsBlock
  }, { deep: true }
)


if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  // 当前设备是移动设备
  isPC.value = false
} else {
  // 当前设备是PC
  isPC.value = true
}




</script>

<style scoped>
.positionCenter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.overlay {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>
