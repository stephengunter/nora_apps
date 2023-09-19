import { FOR_ALL, GUEST_ONLY, USER_ONLY, ADMIN_ONLY } from '@/consts';

const applinks = [];

const adminlinks = [
   {
      name: 'dashboard',
      path: '/',
      view: 'Dashboard',
      parent: '',
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
      view: 'Articles',
      parent: '',
      meta: {
         order: 0,
         icon: 'mdi-post-outline',
         title: '文章管理',
         type: ADMIN_ONLY,
         menu: true
      } 
   },
   {
      name: 'close',
      path: '/close',
      view: 'Close',
      parent: '',
      meta: {
         type: FOR_ALL,
         menus: [],
         icon: '',
         title: '系統維護中'
      } 
   }
];

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
}];

let appRoutes = applinks.concat(adminlinks).concat(guestLinks);

for(let i = 0; i < appRoutes.length; i++){
   appRoutes[i].meta.order = i;
}

export default appRoutes;