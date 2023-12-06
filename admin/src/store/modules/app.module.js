import Errors from '@/common/errors'
import { SET_BREAD_ITEMS, SET_LOADING, SET_ERROR, CLEAR_ERROR, 
   SET_DRAWER, SET_MENUS, TOGGLE_DRAWER, SET_ROUTE
} from '@/store/mutations.type'

const initialState = {
   breadItems: [],
   loading: false,
   drawer: true,
   menus: [],
   errorList: new Errors(),
   route: null
}

export const state = { ...initialState }


const getters = {
   drawer(state) {
      return state.drawer
   },
   breadItems(state) {
      return state.breadItems
   },
   loading(state) {
      return state.loading
   },
   menus(state) {
      return state.menus
   },
   contentMaxWidth(state) {
      if(state.responsive) return state.windowWidth * 0.9
      return (state.windowWidth - state.sideBarWidth) * 0.9
   },
   errorList(state) {
      return state.errorList
   }
}



const mutations = {
   [SET_BREAD_ITEMS](state, items) {
      state.breadItems = items
   },
   [SET_LOADING](state, loading) {
      state.loading = loading
   },
   [SET_DRAWER](state, drawer) {
      state.drawer = drawer
   },
   [TOGGLE_DRAWER](state) {
      state.drawer = !state.drawer
   },
   [SET_MENUS](state, menus) {
      state.menus = menus
   },
   [SET_ERROR](state, errors) {
      state.errorList.record(errors)
   },
   [CLEAR_ERROR](state) {
      state.errorList.clear()   
   },
   [SET_ROUTE](state, model) {
      state.route = model
   }
}

export default {
   state,
   mutations,
   getters
}
 