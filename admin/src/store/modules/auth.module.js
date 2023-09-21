import Errors from '@/common/errors'
import BaseService from '@/common/baseService'
import AuthService from '@/services/auth.service'
import OAuthService from '@/services/oAuth.service'
import JwtService from '@/services/jwt.service'
import { resolveUserFromClaims, isAdmin } from '@/utils'

import { CHECK_AUTH, LOGIN, LOGOUT, REFRESH_TOKEN } from '@/store/actions.type'


import { 
   SET_AUTH, PURGE_AUTH, SET_USER,  SET_ERROR, CLEAR_ERROR, SET_LOADING
} from '@/store/mutations.type'

 
const state = {
   errors: new Errors(),
   user: {},
   isAuthenticated: !!JwtService.getToken()
}

const getters = {
   currentUser(state) {
     return state.user
   },
   isAuthenticated(state) {
     return state.isAuthenticated
   }
}

const actions = {
   [LOGIN](context, token) {
      context.commit(SET_LOADING, true)
      return new Promise((resolve, reject) => {
         OAuthService.googleLogin(token)
         .then(model => {
            context.commit(SET_AUTH, {
               token: model.accessToken.token,
               refreshToken: model.refreshToken
            }) 
            resolve(null)
         })
         .catch(error => {
            reject(error)
         })
         .finally(() => { 
            context.commit(SET_LOADING, false)
         })
      })     
   },
   [LOGOUT](context) {
      context.commit(PURGE_AUTH)
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(true)
         }, 500)
      }) 
   },
   [CHECK_AUTH](context) {
      return new Promise((resolve) => {
         let token = JwtService.getToken()         
         if(token) {
            BaseService.setHeader(token)
            let claims = JwtService.resolveClaims(token)
            let user = resolveUserFromClaims(claims)
            if(isAdmin(user)) {
               context.commit(SET_USER, user) 
               resolve(true)
            }else {
               context.commit(PURGE_AUTH)
               resolve(false)
            }            
         }else {
            context.commit(PURGE_AUTH)
            resolve(false)
         }
      })
   },
   [REFRESH_TOKEN](context) {
      context.commit(SET_LOADING, true)
      return new Promise((resolve) => {
         let accessToken = JwtService.getToken()
         let refreshToken = JwtService.getRefreshToken()
         if(accessToken && refreshToken) {
            AuthService.refreshToken({ accessToken, refreshToken })
            .then(model => {
               context.commit(SET_AUTH, {
                  token: model.accessToken.token,
                  refreshToken: model.refreshToken
               })
               resolve(true)
            })
            .catch(err => {
               context.commit(PURGE_AUTH)
               resolve(false)           
            })
            .finally(() => { 
               context.commit(SET_LOADING, false)
            })
         }else {
            context.commit(PURGE_AUTH)
            resolve(false)
         }
      })
   }   
}


const mutations = {
   [SET_ERROR](state, errors) {
      state.errors.record(errors)
   },
   [CLEAR_ERROR](state) {
      state.errors.clear()   
   },
   [SET_USER](state, user) {
      state.user = user
   },
   [SET_AUTH](state, model) {
      
      JwtService.saveToken(model.token, model.refreshToken)
      let claims = JwtService.resolveClaims(model.token)
      let user = resolveUserFromClaims(claims)
      state.user = user

      state.isAuthenticated = true
      state.errors = new Errors()
      
   },
   [PURGE_AUTH](state) {
      state.isAuthenticated = false
      state.user = null
      
      JwtService.destroyToken()
      BaseService.setHeader(null)
   }
}

export default {
   state,
   actions,
   mutations,
   getters
}
 