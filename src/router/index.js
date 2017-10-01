import Vue from 'vue'
import Router from 'vue-router'
import Tournament from '@/components/Tournament'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tournament',
      component: Tournament
    }
  ]
})
