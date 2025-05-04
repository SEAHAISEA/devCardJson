import { defineStore } from 'pinia'

export const useFieldStore = defineStore('field', {
  // 定义状态
  state: () => ({
    showFieldInputBlock:false,
    fields:[
        { "key": "title", "value": 'Have fun' }, 
        { "key": "name", "value": "SEAHAISEA" },
        { "key": "from", "value": "大理" },
        { "key": "email", "value": "hsfanrice@outlook.com" },
        { "key": "link", "value": "github.com/SEAHAISEA/devCardJson" },
        { "key": "phone", "value": '' },
      ],
      useSetFields:[
        { "key": "title", "value": 'Have fun' }, 
        { "key": "name", "value": "SEAHAISEA" },
        { "key": "from", "value": "大理" },
        { "key": "email", "value": "hsfanrice@outlook.com" },
        { "key": "link", "value": "github.com/SEAHAISEA/devCardJson" },
        { "key": "phone", "value": '' },
      ],
  }),

  // 定义计算属性
  getters: {

  },

  // 定义行为
  actions: {
    setFieldInput(showInput: boolean) {
        this.showFieldInputBlock = showInput 
    },
    updateFields(newFields:{}[],oldFields:{}[]){
        this.useSetFields = newFields
        this.fields = oldFields
    }
  }
});