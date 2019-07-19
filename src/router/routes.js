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
      },
      {
        path: '/active/todo',
        name: 'todo',
        component: () => import(/* webpackChunkName: "todo" */ '../views/active/todo.vue')
      },
      {
        path: '/active/sign',
        name: 'sign',
        component: () => import(/* webpackChunkName: "sign" */ '../views/active/sign.vue')
      }
    ]
    },
    {
      path: '/index',
      name: 'index',
      component: header,
      children: [{
        path: '/index/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: "menu" */ '../views/menu.vue')
      }]
    },
    {
      path: '/answer',
      name: 'answer',
      component: header,
      children: [
      {
        path: '/answer/create',
        name: 'create',
        component: () => import(/* webpackChunkName: "create" */ '../views/answer/createSub.vue')
      },
      {
        path: '/answer/edit',
        name: 'edit',
        component: () => import(/* webpackChunkName: "edit" */ '../views/answer/editSub.vue')
      },
      {
        path: '/answer/reward',
        name: 'reward',
        component: () => import(/* webpackChunkName: "reward" */ '../views/answer/reward.vue')
      },
      {
        path: '/answer/detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/answer/subDetail.vue')
      },
      {
        path: '/answer/status',
        name: 'status',
        component: () => import(/* webpackChunkName: "status" */ '../views/answer/status.vue')
      },
      {
        path: '/answer/rewardres',
        name: 'rewardres',
        component: () => import(/* webpackChunkName: "status" */ '../views/answer/rewardRes.vue')
      },
      {
        path: '/answer/sjcj',
        name: 'sjcj',
        component: () => import(/* webpackChunkName: "sjcj" */ '../views/answer/sjcj.vue')
      }
    ]
    }
]
export default routes