export const photoCustomTag = (model) => `<PHOTO>${JSON.stringify(model)}</PHOTO>`

export const emojiCustomTag = ({key, value}) => `<EMOJI>${key},${value}</EMOJI>`

export const converCustomTags = (html) => {
   return  converEmoji(converPhoto(html))
}

export const converPhoto = (html) => {
   let result = html  
   let matches = html.match(/&lt;PHOTO&gt;(.*?)&lt;\/PHOTO&gt;/g)
   if(!matches) return result

   matches.forEach(item => {
      let model = JSON.parse(item.replace(/&lt;PHOTO&gt;/g, '').replace(/&lt;\/PHOTO&gt;/g, ''))
      let block = `<img src="${model.url}" >`
      result = result.replace(item, block)  
   })
   return result
}
export const converEmoji = (html) => {
   let result = html  
   let matches = html.match(/&lt;EMOJI&gt;(.*?)&lt;\/EMOJI&gt;/g)
   if(!matches) return result

   matches.forEach(item => {
      let model = item.replace(/&lt;EMOJI&gt;/g, '').replace(/&lt;\/EMOJI&gt;/g, '').split(',')
      let block = `<span style="display: inline-block;" class="qqface-wrapper">
      <img src="/qqface.png" class="qqface qqface${model[1]}" >
      </span>
      `
      result = result.replace(item, block)  
   })
   return result
}
// export const converPhoto = (html) => {
//    let result = html
//    let matches = html.match(/<PHOTO>(.*?)<\/PHOTO>/g)
//    if(!matches) return result

//    matches.forEach(item => {
//       let model = JSON.parse(item.replace(/<\/?PHOTO>/g, ''))
//       result = result.replace(item, `<img src='${model.url}'>`)      
//    })
//    return result
// }