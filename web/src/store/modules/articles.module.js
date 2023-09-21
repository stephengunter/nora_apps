import ArticlesService from '@/services/articles.service';
import { FETCH_ARTICLES, ARTICLE_DETAILS } from '@/store/actions.type'
import { SET_LOADING, SET_ARTICLES, SET_TAGS } from '@/store/mutations.type';


const initialState = {
   pagedList: null,
   tags: []
}

export const state = { ...initialState }

const getters = {
   articles(state) {
      if(state.pagedList) return state.pagedList.viewList
      return []
   },
   tags(state) {
      return state.tags
   }
}

const actions = {
   [FETCH_ARTICLES](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         ArticlesService.fetch(params)
            .then(model => {
               context.commit(SET_ARTICLES, model);
               resolve(true);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [ARTICLE_DETAILS](context, id) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         ArticlesService.details(id)
            .then(model => {
               resolve(model);
            })
            .catch(error => {
               reject(error);        
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   }
}

const mutations = {
   [SET_ARTICLES](state, pagedList) {
      state.pagedList = pagedList;
   },
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
 