<template>

  <div
    class="scale-75 bg-black text-white p-4 rounded-lg shadow-lg mx-auto max-w-md flex flex-col items-center border-white border-2">
    <!-- 上区域：选中的图标显示区 -->
    <div class="w-full overflow-x-auto whitespace-nowrap mb-4 border-b">

      <div v-for="(icon, index) in selectedIcons" :key="index" class="inline-block mx-2 mt-2">
        <img :src="icon.path" :alt="icon.name" class="w-12 h-12 bg-white rounded-md" />
        <label class="flex items-center justify-center w-14 h-14">
          <p class="text-xl text-red-600 w-8 h-8 rounded-full border-red-600 border-2 flex items-center justify-center"
            @click="deleteIcon(index)">X</p>
        </label>
      </div>
    </div>

    <!-- 下区域：图标选择区 -->
    <div class="w-full overflow-x-auto whitespace-nowrap mt-4 border-b">
      <div v-for="(icon, index) in allIcons" :key="icon.name" class="inline-block mx-2">
        <img :src="icon.path" :alt="icon.name" class="w-12 h-12 rounded-md bg-white" />
        <label class="flex items-center justify-center w-14 h-14">
          <p class="text-xl text-white w-8 h-8 rounded-full border-white border-2 flex items-center justify-center"
            @click="addIcon(index)">+</p>
        </label>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="flex justify-center mt-3">
      <div class="bg-black text-white text-xl p-4 rounded-lg shadow-lg  w-10/12 flex justify-between  tracking-widest">
        <!-- 添加项按钮 -->
        <button @click="finishIcoon"
          class="mt-2 h-12 w-28 bg-black hover:bg-gray-800 font-bold py-2 px-4 rounded border border-white">
          {{buttonTitle }}</button>
      </div>
    </div>
  </div>







</template>

<script setup lang="ts">
import { ref,watch} from 'vue';
import { useLanguageStore } from '../stores/language';
import { useIconsStore } from '../stores/icons';
const iconsStore = useIconsStore();
const languageStore = useLanguageStore();

let buttonTitle = ref(languageStore.finish)


watch(() => languageStore.finish,
    (finish) => {
        buttonTitle.value = finish
    }, { deep: true }
)



// 所有图标数据 JavaScript
const allIcons = iconsStore.iconsPath;


// 选中的图标数据
let selectedIcons = iconsStore.userSelectedIcons;

iconsStore.updateSelectedIcons([allIcons[193]])


// 删除图标
const deleteIcon = (index) => {
  selectedIcons.splice(index, 1); 
  iconsStore.updateSelectedIcons(selectedIcons)
};

// 添加图标
const addIcon = (eindex) => {
  if(selectedIcons.length < 10){
    selectedIcons.push(allIcons[eindex]);
    iconsStore.updateSelectedIcons(selectedIcons)
  }else{
   alert(languageStore.iconSelectorAlert)
  }
};

const finishIcoon = () => {
  iconsStore.setIcons(false)
};

</script>

<style scoped>
</style>