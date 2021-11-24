export const isBadRequest = (error) => error.status ? error.status === 400 : false;

export const resolveErrorData = (error) => {
   console.log(error);
   if(!error) return null;
   
   if(error.status && error.status === 400) return error.data;
   return error; 
}


export const onError = (error) => {
   Bus.$emit('errors', error);
}

export const showConfirm = ({ type, title, text, ok ='確定', cancel = '取消', onOk = null, onCancel = null,maxWidth = 0}) => {
  Bus.$emit('show-confirm', { type, title, text, ok, cancel, onOk, onCancel });
}


export * from './helper';
export * from './route';
export * from './query';