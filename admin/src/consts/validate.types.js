export const VALIDATE_MESSAGES = {
   REQUIRED: (title) => `必須填寫${title}`,
   MIN_LENGTH: (len, title = '') => `${title}長度至少需要${len}個字元`,
   IS_NUMERIC: (title) => `${title}必須是數字`,
   SAME_AS: (source, target) => `${source}與${target}必須相同`,
   NOT_SAME_AS: (source, target) => `${source}與${target}必須不同`,
   WRONG_FORMAT_OF: (title) => `不正確的${title}格式`,
   SUB: 'sub',
   ROLES: 'roles',
   NAME: 'name'
}

export const VALIDATE_REGEX = {
   URL: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
}