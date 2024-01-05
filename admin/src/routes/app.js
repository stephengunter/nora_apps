import { ROUTE_TYPES, ROUTE_NAMES } from '@/consts'

const applinks = [{
   name: 'close',
   path: '/close',
   view: 'Close',      
   meta: {
      menus: [],
      icon: '',
      title: '系統維護中'
   } 
},
{
   name: '404',
   path: '/:pathMatch(.*)*',
   view: '404',      
   meta: {
      menus: [],
      icon: '',
      title: 'Page Not Found'
   } 
},
{
   name: 'test',
   path: '/test',
   view: 'Test',      
   meta: {
      order: 0,
      menu: false
   } 
}]

const adminlinks = [{
   name: 'dashboard',
   path: '/',
   view: 'Dashboard',      
   meta: {
      order: 0,
      icon: 'mdi-view-dashboard',
      title: 'Dashboard',
      menu: true
   } 
},
{
   name: ROUTE_NAMES.ARTICLE_INDEX,
   path: '/articles',
   view: 'articles/Index',      
   meta: {
      order: 0,
      children: ['article-edit'],
      icon: 'mdi-post-outline',
      title: '文章管理',
      menu: true
   } 
},
{
   name: ROUTE_NAMES.ARTICLE_EDIT,
   path: '/articles/edit/:id?',
   view: 'articles/Edit',
   meta: {
      order: 0,
      icon: '',
      title: '文章管理 - 編輯',
      menu: false
   }
},
{
   name: 'profiles',
   path: '/profiles',
   view: 'Profiles',
   meta: {
      order: 0,
      icon: '',
      title: 'Profiles',
      menu: false
   }
}]

const guestLinks = [{
   name: ROUTE_NAMES.LOGIN,
   path: '/login',
   view: 'Login',
   meta: {
      icon: 'mdi-login-variant',
      title: 'Login',
      menu: true
   } 
}]

applinks.forEach(page => {
   page.meta.type = ROUTE_TYPES.FOR_ALL
})
adminlinks.forEach(page => {
   page.meta.type = ROUTE_TYPES.ADMIN_ONLY
})
guestLinks.forEach(page => {
   page.meta.type = ROUTE_TYPES.GUEST_ONLY
})

let appRoutes = applinks.concat(adminlinks).concat(guestLinks)

for(let i = 0; i < appRoutes.length; i++){
   appRoutes[i].meta.order = i
}

export default appRoutes