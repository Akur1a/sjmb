import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/printing/HelloWorld'
import HelloWorld from '@/components/sj/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        // base: '/html1/',
        name: 'HelloWorld',
        component: HelloWorld
    }]
})