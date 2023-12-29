export const isSmallScreen = () => window.innerWidth < 991

export const scrollToTop = () => {
   let element = document.getElementById('app')
   if(!element) return

   element.scrollIntoView()
}

export const activeOptions = [{
   value: 1,
   text: '上架中'
},{
   value: 0,
   text: '已下架'
}]

export const statusText = (active) => active ? '上架中' : '已下架'