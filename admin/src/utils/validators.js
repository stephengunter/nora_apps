import Errors from '@/common/errors';

export const addErrorMsg = (validator, key, msg) => {
   let errors = { ...validator.errors };
   errors[key] = [msg];
   validator.setErrors(errors);
}

export const getErrorMsg = (errors, key) => {
   if(errors) {
      return errors.hasOwnProperty(key) ? errors[key][0] : '';
   }
   return  '';
}

export const clearErrors = (errors, keys = []) => {
   keys.forEach(key => {
      if(errors.hasOwnProperty(key)) errors[key] = [];
   })
	return errors;
}


export const isValidURL = (str) => {
   const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i') // fragment locator
   return !!pattern.test(str)
}