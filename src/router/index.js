import Vue from 'vue'
import VueRouter from 'vue-router'
import signIn from './signIn.vue'

Vue.use(VueRouter)

const routes = [
 {
   path: '/login',
   component: signIn
 }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
