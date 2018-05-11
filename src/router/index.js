import Vue from 'vue'
import Router from 'vue-router'
import game2048 from '@/components/game/game2048'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: '2048',
        component: game2048
    }]
})
