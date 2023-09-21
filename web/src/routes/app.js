import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from '@/consts'

const applinks = [{
   name: 'home',
   path: '/',
   view: 'Home',
   parent: '',
   meta: {
      order: 0,
      icon: 'mdi-home',
      title: '首頁',
      type: USER_ONLY,
      menu: true
   } 
},{
   name: 'games',
   path: '/games',
   view: 'Games',
   parent: '',
   meta: {
      order: 0,
      icon: 'mdi-puzzle',
      title: '小遊戲',
      type: USER_ONLY,
      menu: true
   } 
},{
   name: 'tools',
   path: '/tools',
   view: 'Tools',
   parent: '',
   meta: {
      order: 0,
      icon: 'mdi-tools',
      title: '工具箱',
      type: USER_ONLY,
      menu: true
   } 
},{
   name: 'article',
   path: '/article/:id',
   view: 'Article',
   parent: '',
   meta: {
      order: 0,
      icon: '',
      title: '',
      type: USER_ONLY,
      menu: false
   } 
}]

const guestLinks = [{
   name: 'login',
   path: '/login',
   view: 'Login',
   parent: 'Dashboard',
   meta: {
      icon: 'mdi-login-variant',
      title: 'Login',
      type: GUEST_ONLY,
      menu: true
   } 
}]

const adminlinks = []

let appRoutes = applinks.concat(adminlinks).concat(guestLinks)

for(let i = 0; i < appRoutes.length; i++) {
   appRoutes[i].meta.order = i
}

export default appRoutes