import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from '@/consts'

const applinks = [];

const adminlinks = [
   {
      name: 'dashboard',
      path: '/',
      view: 'Dashboard',      
      meta: {
         order: 0,
         icon: 'mdi-view-dashboard',
         title: 'Dashboard',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'articles',
      path: '/articles',
      view: 'articles/Index',      
      meta: {
         order: 0,
         children: ['article-edit'],
         icon: 'mdi-post-outline',
         title: '文章管理',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'article-edit',
      path: '/articles/edit/:id?',
      view: 'articles/Edit',
      meta: {
         order: 0,
         icon: '',
         title: '文章管理 - 編輯',
         type: ADMIN_ONLY,
         menu: false
      }
   },
   {
      name: 'test',
      path: '/test',
      view: 'Test',      
      meta: {
         order: 0,
         type: ADMIN_ONLY,
         menu: false
      } 
   },
   {
      name: 'close',
      path: '/close',
      view: 'Close',      
      meta: {
         type: FOR_ALL,
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
         type: FOR_ALL,
         menus: [],
         icon: '',
         title: 'Page Not Found'
      } 
   },
];

const guestLinks = [{
   name: 'login',
   path: '/login',
   view: 'Login',
   meta: {
      icon: 'mdi-login-variant',
      title: 'Login',
      type: GUEST_ONLY,
      menu: true
   } 
}];

let appRoutes = applinks.concat(adminlinks).concat(guestLinks);

for(let i = 0; i < appRoutes.length; i++){
   appRoutes[i].meta.order = i;
}

export default appRoutes;