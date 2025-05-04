import { defineStore } from 'pinia'
export const useLanguageStore = defineStore('language', {
  // 定义状态
  state: () => ({
    headerVueTitleH1:{"titleH1":"Developer Business Card"},
    businessCardVueBtn:{'field': 'Field', 'icon': 'Icon', 'save': 'Save' },
    finish:"Finish",
    iconSelectorAlert:"Maximum of 10 allowed!",
    cardRadiusTitle:'cardRadius',
    cardTitle:'cardTitle',
  }),

  // 定义计算属性
  getters: {

  },

  // 定义行为
  actions: {
    setLanguage(lang: string) {
        if(lang === 'en'){
            this.headerVueTitleH1.titleH1 = "Developer Business Card"
            this.businessCardVueBtn = {'field': 'Field', 'icon': 'Icon', 'save': 'Save' }
            this.finish = "Finish"
            this.iconSelectorAlert="Maximum of 10 allowed!"
            this.cardRadiusTitle="cardRadius"
            this.cardTitle='cardTitle'

        }else{
            this.headerVueTitleH1.titleH1 = "开发者名片"
            this.businessCardVueBtn = {'field': '字段', 'icon': '图标', 'save': '保存' }
            this.finish = "确定"
            this.iconSelectorAlert="最多添加10个!"
            this.cardRadiusTitle="圆角"
            this.cardTitle='标题'
        }
    }
  }
});