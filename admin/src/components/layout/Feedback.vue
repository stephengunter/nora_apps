<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { CHECK_AUTH, REFRESH_TOKEN } from '@/store/actions.type'
import { LOGIN } from '@/store/actions.type'


const name = 'LayoutFeedBack'
const store = useStore()
const route = useRoute()
const router = useRouter()

const data = reactive({
   success: {
		color: 'success',
		icon: 'mdi-check-circle',
		show: false,
		timeout: 1500,
		msg: '存檔成功'
	},
	confirm: {
		type: false,
		title: '',
		text: '',
		active: false,
		action: '',
		maxWidth: 420,
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
		type: 'error',
		title: '伺服器暫時無回應，請稍候再試.',
		text: ''
	}
	if(error) {
		confirm.title = error.title ? error.title : '伺服器暫時無回應，請稍候再試.'
		confirm.text = error.text ? error.text : ''
		
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
	data.success.icon = 'mdi-check-circle'
	data.success.color = 'success'
	data.success.msg = msg ? msg : '存檔成功'
	data.success.show = true
}
function onWarning(msg){
	data.success.icon = 'mdi-alert-circle'
	data.success.color = 'warning'
	data.success.msg = msg
	data.success.show = true
}

function showConfirm({type, title, text, ok ='確定', cancel = '取消', onOk = null, onCancel = null, maxWidth = 0 }) {
	data.confirm = {
		type,
		title,
		text,
		maxWidth: maxWidth ? maxWidth : 420,
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
		maxWidth: 420,
		active: false,
		on_ok: null,
		on_cancel: null
	}
}

Bus.on('errors', onError)
Bus.on('success', onSuccess)
Bus.on('warning', onWarning)
Bus.on('show-confirm', showConfirm)
Bus.on('re-login', reLogin)

</script>
<template>
	<div>

		<LayoutLoading />

		<LayoutShow />

		<v-snackbar :timeout="data.success.timeout" top right dark
			:color="data.success.color" v-model="data.success.show"
		>
			<v-icon color="white" >
			{{ data.success.icon }}
			</v-icon>
			<span class="ml-3" style="font-size:1.2rem vertical-align: middle">
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