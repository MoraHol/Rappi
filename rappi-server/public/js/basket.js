let basketContainer = document.getElementsByClassName('basket-container').item(0)
document.getElementById('btn-basket').onclick = () => {
  basketContainer.setAttribute('class', 'basket-container show')
}
document.getElementsByClassName('close-basket').item(0).onclick = () => {
  basketContainer.setAttribute('class', 'basket-container')
}
