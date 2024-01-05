export const photoCustomTag = (model) => `<PHOTO>${JSON.stringify(model)}</PHOTO>`

export const emojiCustomTag = ({key, value}) => `<EMOJI>${key},${value}</EMOJI>`

export const converPhoto = (html) => {
   let result = html
   let matches = html.match(/<PHOTO>(.*?)<\/PHOTO>/g)
   if(!matches) return result

   matches.forEach(item => {
      let model = JSON.parse(item.replace(/<\/?PHOTO>/g, ''))
      result = result.replace(item, `<img src="${model.url}">`)  
   })
   return result
}
// export const converPhoto = (html) => {
//    let result = html;
//    let matches = html.match(/<PHOTO>(.*?)<\/PHOTO>/g)
//    if(!matches) return result

//    matches.forEach(item => {
//       let model = JSON.parse(item.replace(/<\/?PHOTO>/g, ''))
//       result = result.replace(item, `<img src="${model.url}">`);      
//    })
//    return result
// }