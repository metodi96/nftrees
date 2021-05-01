export const computeWidth = (items) => {
    if (items < 5) return `${items*300}px`
    else return '1500px'
}