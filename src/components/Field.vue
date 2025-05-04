<template>

    <div class="overflow-y-scroll h-96 w-96 rounded border border-white">

        <div class="bg-black text-white p-4 rounded-lg shadow-lg mx-auto max-w-md flex flex-col items-center">

            <div class="mb-4">
                <div class="flex flex-col md:flex-row items-center mb-2">
                    <span class="w-24">{{cardTitle}}</span>
                    <input type="text" maxlength="18" :placeholder="cardTitleValue" @input="getCardTitleValue" class="px-2 py-1 rounded text-black" />
                </div>
            </div>
            <!-- 字段输入 -->
            <div v-for="(field, index) in fields" :key="index" class="mb-4">
                <div class="flex flex-col md:flex-row items-center mb-2">
                    <span class="w-24">Key {{ index + 1 }}:</span>
                    <input type="text" maxlength="10" v-model="field.key" class="px-2 py-1 rounded text-black" />
                </div>
                <div class="flex flex-col md:flex-row items-center">
                    <span class="w-24">Value {{ index + 1 }}:</span>
                    <input type="text" maxlength="32" v-model="field.value" class="px-2 py-1 rounded text-black" />
                </div>
            </div>
            <!-- 确定按钮 -->
            <button @click="submit"
                class="mt-4 tracking-widest bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded border border-white">
                {{ buttonTitle }}
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch, toRaw } from 'vue';
import { useLanguageStore } from '../stores/language';
import { useFieldStore } from '../stores/field';
import { useCanvasStore } from '../stores/canvas';

const fieldStore = useFieldStore();
const canvasStore = useCanvasStore();
const languageStore = useLanguageStore();
let buttonTitle = ref(languageStore.finish)
let cardTitle = ref(languageStore.cardTitle)


let cardTitleValue = ref(canvasStore.cardTitleValue)

const getCardTitleValue=(e)=>{
    let title = e.target.value +'.json'
    cardTitleValue.value = title
    canvasStore.setcardTitleValue(title)
}


watch(() => languageStore.finish,
    (finish) => {
        buttonTitle.value = finish,
        cardTitle.value = languageStore.cardTitle
    }, { deep: true }
)


// 初始化字段数组
let fields = fieldStore.fields;

// 提交方法 
const submit = () => {
    let newFields = fields.filter(item => item.key !== "" || item.value !== "");
    fieldStore.setFieldInput(false)
    fieldStore.updateFields(newFields, fields)
};
</script>

<style scoped></style>