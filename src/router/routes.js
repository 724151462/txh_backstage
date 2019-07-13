import login from '../views/login.vue'
let header = () => import(/* webpackChunkName: "acrlist" */ '../components/header.vue')
let routes = [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/active',
      name: 'active',
      component: header,
      children: [{
        path: '/active/list',
        name: 'actlist',
        component: () => import(/* webpackChunkName: "actlist" */ '../views/active/list.vue')
      }]
    }
]
export default routes