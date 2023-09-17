import { createRouter, createWebHistory } from 'vue-router'
import appRoutes from './app'
import store from '@/store'

import JwtService from '@/services/jwt.service'
import { FOR_ALL, GUEST_ONLY } from '@/consts'
import { APP_CLOSED } from '@/config'
import { CHECK_AUTH, REFRESH_TOKEN } from '@/store/actions.type'
import { SET_MENUS } from '@/store/mutations.type'
import { getMainMenus } from '@/common/menu'


const history = createWebHistory(import.meta.env.BASE_URL)
const routes = appRoutes.map(item => {
	return { 
		...item, 
		component: () => import(`@/views/${item.view}.vue`)
	}
})


const redirect = (next, route) => next(route)

const authDone = (next, to, auth = false) => {
	let mainMenus = getMainMenus(to, auth)
	store.commit(SET_MENUS, mainMenus)
	return next()
}
const refreshToken = (next, to) => {
	store.dispatch(REFRESH_TOKEN).then(token => {	
		if(token) return redirect(next, { path: to.path })
		else return redirect(next, { path: '/login' })
	})
}

const router = createRouter({
	history, routes
})

router.beforeEach((to, from, next) => {
	if(APP_CLOSED && to.name !== 'close') return redirect(next, { name: 'close' })
	store.dispatch(CHECK_AUTH).then(auth => {
		if(to.meta.type === FOR_ALL) return authDone(next, to, auth)	
		if(auth){ 
			if(to.meta.type === GUEST_ONLY) return redirect(next, { path: '/' })

			let tokenStatus = JwtService.tokenStatus()
			if(tokenStatus === -1) {
				//token過期
				return refreshToken(next, to)

			}else if(tokenStatus === 0) {
				//token 即將到期
				return refreshToken(next, to)

			}else return authDone(next, to, auth)
			
		} else{
			//無token
			if(to.meta.type === GUEST_ONLY) return authDone(next, to, auth)
			else return redirect(next, { path: '/login' })
		}
	})
})

export default router
