import { isEmptyObject } from './objects'

export const copyFromQuery = (params, query) => {

}

export const buildQuery = (url, params) => {
   if(!params || isEmptyObject(params)) return url
   url += '?'
   for (let field in params) {
      let value = params[field]
      url += `${field}=${value}&`
   }
   return url.substr(0, url.length - 1)
}