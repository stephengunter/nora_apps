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
      type: FOR_ALL,
      menu: true
   } 
},{
   name: 'games',
   path: '/',
   view: 'Games',
   parent: '',
   meta: {
      order: 0,
      icon: 'mdi-puzzle',
      title: '小遊戲',
      type: FOR_ALL,
      menu: true
   } 
},{
   name: 'tools',
   path: '/',
   view: 'Tools',
   parent: '',
   meta: {
      order: 0,
      icon: 'mdi-tools',
      title: '工具箱',
      type: FOR_ALL,
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
      type: FOR_ALL,
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