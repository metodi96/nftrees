export const computeWidth = (items, isDesktop) => {
    //console.log('innter width: ', window.innerWidth)
    if (!isDesktop) return
    if (items < 5) return `${items*300}px`
    else return '1500px'
}