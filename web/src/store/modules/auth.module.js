import jwtDecode from 'jwt-decode';
import BaseService from '@/common/baseService';

import AuthService from '@/services/auth.service';
import JwtService from '@/services/jwt.service';


import {
   CHECK_AUTH,
   REFRESH_TOKEN,
   LOGIN,
   LOGOUT
} from '../actions.type';

import { SET_AUTH, SET_AUTH_CHANGED, PURGE_AUTH, SET_USER, 
   SET_LOADING 
} from '../mutations.type';

 
const state = {
   isAuthenticated: !!JwtService.getToken(),
   user: null,
   changed: false
};

const getters = {
   currentUser(state) {
     return state.user;
   },
   isAuthenticated(state) {
     return state.isAuthenticated;
   },
   authChanged(state) {
      return state.changed;
   }
};

const actions = {
   [LOGIN](context, token) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         AuthService.login({ token })
         .then(model => {
            context.commit(SET_AUTH, {
               token: model.accessToken.token,
               refreshToken: model.refreshToken
            }); 
            resolve(null);
         })
         .catch(error => {
            reject(error);
         })
         .finally(() => { 
            context.commit(SET_LOADING, false);
         });
      });     
   },
   [LOGOUT](context) {
      context.commit(PURGE_AUTH);
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(true);
         }, 500)
      }); 
   },
   [CHECK_AUTH](context) {
      return new Promise((resolve) => {
         let token = JwtService.getToken();
         if(token) {
           
            BaseService.setHeader(token);
           
            let claims = jwtDecode(token);
            let user = {
               id: claims.id,
               email: claims.sub,
               picture: claims.picture,
               name: claims.name,
               roles: claims.roles ? claims.roles.split(',') : []
            };
            context.commit(SET_USER, user); 
            resolve(user);           
         }else {
            context.commit(PURGE_AUTH);
            resolve(null);
         }
      });
   },
   [REFRESH_TOKEN](context) {
      context.commit(SET_LOADING, true, '重新登入中...');
      return new Promise((resolve) => {
         let accessToken = JwtService.getToken();
         let refreshToken = JwtService.getRefreshToken();
         if(accessToken && refreshToken) {
            AuthService.refreshToken({ accessToken, refreshToken })
            .then(model => {
               context.commit(SET_AUTH, {
                  token: model.accessToken.token,
                  refreshToken: model.refreshToken
               });
               resolve(true);
            })
            .catch(err => {
               context.commit(PURGE_AUTH);
               resolve(false);           
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
         }else {
            context.commit(PURGE_AUTH);
            resolve(false);
         }
      });
   }
};


const mutations = {
   [SET_USER](state, user) {
      if(user) state.user = user;
      else state.user = null;
   },
   [SET_AUTH](state, model) {
      
      JwtService.saveToken(model.token, model.refreshToken);

      let claims = jwtDecode(model.token);
      console.log('claims', claims);
      state.user = {
         id: claims.id,
         email: claims.sub,
         picture: claims.picture,
         name: claims.name,
         roles: claims.roles ? claims.roles.split(',') : []
      };

      state.isAuthenticated = true;
   },
   [SET_AUTH_CHANGED](state, val) {
      state.changed = val;
   },
   [PURGE_AUTH](state) {
      state.isAuthenticated = false;
      state.user = null;
      
      JwtService.destroyToken();
      BaseService.setHeader(null);
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 