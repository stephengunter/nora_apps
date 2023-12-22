<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { CHECK_AUTH, REFRESH_TOKEN } from '@/store/actions.type'
import { LOGIN, RE_LOGIN, SHOW_CONFIRM } from '@/store/actions.type'
import { DIALOG_MAX_WIDTH } from '@/config'
import { ERRORS, WARNING, SUCCESS, ICONS, DIALOG_TITLE, DIALOG_MESSAGE } from '@/consts'


const name = 'LayoutFeedBack'
const store = useStore()
const route = useRoute()
const router = useRouter()

const data = reactive({
   success: {
		color: SUCCESS,
		icon: ICONS[SUCCESS],
		show: false,
		timeout: 1500,
		msg: '存檔成功'
	},
	confirm: {
		type: false,
		title: '',
		text: '',
		active: false,
		maxWidth: DIALOG_MAX_WIDTH,
		ok_text: '確定',
		cancel_text: '取消',
		on_ok: null,
		on_cancel: null
	}
})

const currentUser = computed(() => store.getters.currentUser)
const confirmNoAction = computed(() => {
	if(data.confirm.on_ok) return false
	if(data.confirm.on_cancel) return false
	return true
})
 
function onError(error) {
	let confirm = {
		type: ERRORS,
		title: DIALOG_TITLE[ERRORS],
		text: DIALOG_MESSAGE[ERRORS]
	}
	if(error) {
		console.log(error)
		if(error.title) confirm.title = error.title
		if(error.text) confirm.text = error.text
		
		let status = error.status
		errorHandler(status, confirm)
	}else {
		// no error data
		showConfirm(confirm)
	}
}
function errorHandler(code, confirm) {
	if(code === 401) {
		reLogin(() => {
			showConfirm({
				type: '',
				title: '請重新操作',
				text: '您的驗証剛剛刷新，請重新操作一次'
			})
		})
	}else if(code === 403) {
		//Forbidden
		showConfirm({
			type: '',
			title: '權限不足',
			text: '',
			ok: '確定',
			cancel: ''
		})
	}else {
		showConfirm(confirm)
	}
}
function reLogin(callback = null) {
   //重新登入
   store.dispatch(CHECK_AUTH).then(auth => {
      if(auth){
         store.dispatch(REFRESH_TOKEN).then(token => {	
            if(token) {
               store.dispatch(CHECK_AUTH);
               if(callback) callback()
            } 
            else redirect('login', route.path)
         })
      }else {
         //無token
         redirect('login', route.path)
      }
   })
}
function redirect(name, returnUrl) {
	if(name === 'login') router.push({ name: 'login', query: { returnUrl } })
}

function onSuccess(msg) {
	console.log('onSuccess', msg)
	data.success.icon = ICONS[SUCCESS]
	data.success.color = SUCCESS
	data.success.msg = msg ? msg : '存檔成功'
	data.success.show = true
}
function onWarning(msg){
	data.success.icon = ICONS[WARNING]
	data.success.color = WARNING
	data.success.msg = msg
	data.success.show = true
}

function showConfirm({type, title, text, ok ='確定', cancel = '取消', onOk = null, onCancel = null, maxWidth = 0 }) {
	data.confirm = {
		type,
		title,
		text,
		maxWidth: maxWidth ? maxWidth : DIALOG_MAX_WIDTH,
		ok_text: ok,
		cancel_text: cancel,
		active: true,
		on_ok: onOk,
		on_cancel: onCancel
	}
}
function hideConfirm() {
	data.confirm = {
		type: '',
		title: '',
		text: '',
		ok_text: '確定',
		cancel_text: '取消',
		maxWidth: DIALOG_MAX_WIDTH,
		active: false,
		on_ok: null,
		on_cancel: null
	}
}

Bus.on(ERRORS, onError)
Bus.on(SUCCESS, onSuccess)
Bus.on(WARNING, onWarning)
Bus.on(SHOW_CONFIRM, showConfirm)
Bus.on(RE_LOGIN, reLogin)

</script>
<template>
	<div>

		<LayoutLoading />

		<LayoutShow />

		<v-snackbar :timeout="data.success.timeout"
		:color="data.success.color" v-model="data.success.show"
		>
			<v-icon :icon="data.success.icon" color="white" />
			<span class="ml-3">
				{{ data.success.msg  }}
			</span>
		</v-snackbar>

		<v-dialog v-model="data.confirm.active" :max-width="data.confirm.maxWidth" :persistent="!confirmNoAction">
			<core-confirmation :type="data.confirm.type"
			:title="data.confirm.title" :text="data.confirm.text"
			:ok_text="data.confirm.ok_text"  :cancel_text="data.confirm.cancel_text"
			:on_cancel="data.confirm.on_cancel"  :on_ok="data.confirm.on_ok"
			@ok="hideConfirm" @cancel="hideConfirm"
			/>
		</v-dialog>
		
	</div>
</template>