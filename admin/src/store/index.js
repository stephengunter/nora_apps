import { createStore } from 'vuex'

import app from './modules/app.module'
import auth from './modules/auth.module'
import articles from './modules/articles.module'
import users from './modules/users.module'
import profiles from './modules/profiles.module'
import passwords from './modules/passwords.module'

const store = createStore({
   modules: {
      app,
      auth,
      articles,
      users,
      profiles,
      passwords
   }
})

export default store