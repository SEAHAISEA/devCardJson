<template>
  <div>
    <div class="crd-box  mt-5 border-white border-2 scale-75" :class="cardRadius ? 'rounded-xl' :''">

      <div class="h-12 crd-title" :class="cardRadius ? 'rounded-xl' :''">
        <!--  -->
        <div class="flex flex-row">
          <div class=" bg-title_point_1 w-6 h-6 rounded-full mr-2"></div>
          <div class="bg-title_point_2 w-6 h-6 rounded-full mr-2"></div>
          <div class="bg-title_point_3 w-6 h-6 rounded-full"></div>
        </div>
        <!--  -->
        <p class="text-2xl">{{ cardTitleValue }}</p>
        <!--  -->
        <p class="text-5xl">···</p>
      </div>
      <!--  -->
      <div class="h-14 crd-title-icon">
        <!-- icon -->
        <div class="flex flex-row">
          <div v-for="(icon, index) in userIcons" :key="index" class="w-12 h-14 flex items-center justify-center">
            <img :src="icon.path" :alt="icon.name" class="w-10 h-10 rounded-md bg-white">
          </div>
        </div>

      </div>
      <!--  -->
      <div class="flex flex-row mt-3">
        <!-- 行号 -->
        <div class="w-8 flex justify-center">
          <p class="text-xl">1</p>
        </div>
        <div class="">
          <p class="text-xl">{</p>
        </div>
      </div>
      <!--  -->
      <div v-for="(item, index) in fields" :key="index" class="flex flex-row">
        <div class="w-8 flex justify-center">
          <p class="text-xl">{{ index + 2 }}</p>
        </div>
        <!-- key -->
        <div class="flex flex-row">
          <div>
            <p class="text-xl  ml-6 key-color">{{ `"${item.key}"` }}</p>
          </div>
          <!--  -->
          <div>
            <p class="text-xl ml-1">{{ ':' }}</p>
          </div>
          <!-- value -->
          <div>
            <div v-if="item.value != 'null'">
              <p class="text-xl ml-3 value-color">{{ `"${item.value}"` }}</p>
            </div>
            <div v-else>
              <p class="text-xl ml-3 value-color">{{ 'null' }}</p>
            </div>
          </div>
          <!-- 逗号-->
          <div>
            <p class="text-xl">{{ ',' }}</p>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="flex flex-row">
        <!-- 行号 -->
        <div class="w-8 flex justify-center">
          <p class="text-xl">{{ rightBrace }}</p>
        </div>
        <!-- { -->
        <div class="">
          <p class="text-xl">}</p>
        </div>
      </div>

      <!-- end -->
    </div>
    <!-- 圆角 -->
    <div class="flex items-center justify-center scale-75">
      <div class="flex items-center justify-center w-48 h-14">
        <label class="mr-6 text-2xl">
          {{ cardRadiusTitle }}
        </label>
        <input type="checkbox" checked="true" class="w-5 h-5"  @change="watchIsChecked"/>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="flex justify-center scale-75">
      <div class="bg-black text-white text-xl p-4 rounded-lg shadow-lg  w-10/12 flex justify-between  tracking-widest">
        <!-- 添加项按钮 -->
        <button @click="addItem"
          class="mt-2 h-12 w-28 bg-black hover:bg-gray-800 font-bold py-2 px-4 rounded border border-white">
          {{ buttonsTitle.field }}</button>
        <!-- 图标按钮 -->
        <button @click="addIcon"
          class="mt-2 h-12 w-28 bg-black hover:bg-gray-800 font-bold py-2 px-4 rounded border border-white">
          {{ buttonsTitle.icon }}</button>
        <!-- 保存按钮 -->
        <button @click="save"
          class="mt-2 h-12 w-28 bg-black hover:bg-gray-800 font-bold py-2 px-4 rounded border border-white">
          {{ buttonsTitle.save }}</button>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, watch, toRaw } from 'vue';
import { useLanguageStore } from '../stores/language';
import { useFieldStore } from '../stores/field';
import { useIconsStore } from '../stores/icons';
import { useCanvasStore } from '../stores/canvas';

const fieldStore = useFieldStore();
const languageStore = useLanguageStore();
const iconsStore = useIconsStore();
const canvasStore = useCanvasStore();


let buttonsTitle = ref(languageStore.businessCardVueBtn)

watch(() => languageStore.businessCardVueBtn,
  (businessCardVueBtn) => {
    buttonsTitle.value = businessCardVueBtn,
    cardRadiusTitle = languageStore.cardRadiusTitle
  }, { deep: true }
)


let fields = fieldStore.fields;

watch(() => fieldStore.useSetFields,
  (newFields) => {
    fields = newFields
    rightBrace.value = fields.length + 2
  }, { deep: true }
)

let rightBrace = ref(0)
let cardTitleValue = ref(canvasStore.cardTitleValue)
rightBrace.value = fields.length + 2

watch(() => canvasStore.cardTitleValue,
  (newTitle) => {
    cardTitleValue.value = newTitle
  }, { deep: true }
)

let userIcons = iconsStore.userSelectedIcons

watch(() => iconsStore.userSelectedIcons,
  (userSelectedIcons) => {
    userIcons = userSelectedIcons
  }, { deep: true }
)

// 圆角默认选中状态
const isChecked = ref(true);
let cardRadiusTitle = languageStore.cardRadiusTitle
let cardRadius = ref(canvasStore.cardRadius)

// 圆角监听选中状态变化
const watchIsChecked = (e) => {
  let isChecked = e.target.checked
  cardRadius.value = isChecked
  canvasStore.setCardRadius(isChecked)
};

// 添加字段的方法
const addItem = () => {
  fieldStore.setFieldInput(true)
};

// 添加图标的方法
const addIcon = () => {
  iconsStore.setIcons(true)
};

// 保存的方法
const save = () => {
  canvasStore.drawCard(toRaw(userIcons), toRaw(fieldStore.useSetFields))
};


</script>

<style scoped>
.crd-box {
  width: 35rem;
  height: 22rem;
  background-color: #1b1b17;
}

.crd-title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #000000;
}

.crd-title-icon {
  background-color: #2b2b2b;
}

.key-color {
  color: #ce9178;
}

.value-color {
  color: #e7db74;
}
</style>