import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from "@/components/Layout.vue"
import Icon from "@/components/Icon.vue"
import ButtonStyle from "@/components/ButtonStyle.vue"
import FormItem from "@/components/Money/FormItem.vue"
import tagListModel from "@/models/tagListModel"
import recordListModel from './models/recordListModel'

Vue.config.productionTip = false

Vue.component("Nav", Nav)
Vue.component("Layout", Layout)
Vue.component("Icon", Icon)
Vue.component("ButtonStyle", ButtonStyle)
Vue.component("FormItem", FormItem)

// record store
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem) => { recordListModel.create(record) }

// tag store
window.tagList = tagListModel.fetch()
window.findTag = (id: string) => {
  return window.tagList.filter((tag) => tag.id === id)[0];

}
window.createTag = (name: string) => {
  if (name) {
    const message = tagListModel.create(name);
    if (message === "duplicated") {
      window.alert("标签名重复了");
    } else if (message === "success") {
      window.alert("添加成功");
    }
  }
}
window.removeTag = (tag: tag) => {
  return tagListModel.remove(tag.id)
}
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
