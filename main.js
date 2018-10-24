import Vue from 'vue'
import App from './App'
import base from './base'//引用
    

Vue.config.productionTip = false
    
Vue.use(base);//将全局函数当做插件来进行注册

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
