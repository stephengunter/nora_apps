import { createStore } from 'vuex'

import app from './modules/app.module'
import auth from './modules/auth.module'
import articles from './modules/articles.module'
import users from './modules/users.module'

const store = createStore({
   modules: {
      app,
      auth,
      articles,
      users,
   }
})

export default store