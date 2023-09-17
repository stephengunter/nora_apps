import {  } from '@/store/actions.type'
import { SET_TAGS } from '@/store/mutations.type'


const initialState = {
   tags: []
}

export const state = { ...initialState }

const getters = {
   tags(state) {
      return state.tags
   }
}

const actions = {
   
}

const mutations = {
   [SET_TAGS](state, tags) {
      state.tags = tags
   }
}

export default {
   state,
   actions,
   mutations,
   getters
}
 