import ArticlesService from '@/services/articles.service';
import { FETCH_ARTICLES, ARTICLE_DETAILS} from '@/store/actions.type';
import { SET_LOADING, SET_ARTICLES, SET_ARTICLE } from '@/store/mutations.type';


const initialState = {
   model: null,
   pagedList: null,   
};

export const state = { ...initialState };
 
const getters = {
   
};


const actions = {
   [FETCH_ARTICLES](context, params) {
      context.commit(SET_LOADING, true);
      return new Promise((resolve, reject) => {
         ArticlesService.fetch(params)
            .then(model => {
               context.commit(SET_ARTICLES, model);
               resolve(model);
            })
            .catch(error => {
               reject(error);
            })
            .finally(() => { 
               context.commit(SET_LOADING, false);
            });
      });
   },
   [ARTICLE_DETAILS](context, { id, user }) {
      return new Promise((resolve, reject) => {
         ArticlesService.details({ id, user })
            .then(model => {
               context.commit(SET_ARTICLE, model);
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
};


const mutations = {
   [SET_ARTICLES](state, pagedList) {
      if(pagedList) state.pagedList = pagedList;
      else state.pagedList = null;      
   },
   [SET_ARTICLE](state, model) {
      if(model) state.model = model;
      else state.model = null;
   }
};

export default {
   state,
   actions,
   mutations,
   getters
};
 