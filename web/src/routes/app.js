import { FOR_ALL, GUEST_ONLY, USER_ONLY } from './route.type';

const applinks = [];

const userLinks = [{
   name: 'home',
   path: '/',
   view: 'Home',
   parent: '',
   meta: {
      type: USER_ONLY,
      menus: [],
      icon: 'mdi-home',
      title: '首頁'
   } 
}];

const guestLinks = [{
   name: 'login',
   path: '/login',
   view: 'Login',
   meta: {
      type: GUEST_ONLY,
      menus: [{
         key: 'main', show: GUEST_ONLY, order: 6
      }],
      icon: 'mdi-login-variant',
      title: '登入',
      menu: true
   } 
}];

let appRoutes = applinks.concat(userLinks).concat(guestLinks);

for(let i = 0; i < appRoutes.length; i++){
   appRoutes[i].meta.order = i;
}

export default appRoutes;