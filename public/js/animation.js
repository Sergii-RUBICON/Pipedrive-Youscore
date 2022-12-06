const monthly = document.querySelector('.monthly-btn')
const yearly = document.querySelector('.yearly-btn')
const info_user = document.querySelector('.info_user')
const dropdown_menu = document.querySelector('.dropdown_menu')
const open_menu_btn = document.getElementById('open_menu_btn')
const close_menu_btn = document.querySelector('page_main')
const price_desc = document.querySelector('.price-description')
const priceEnding = document.querySelector('.price-ending')
const block_info = document.querySelector('.block_header_info')
const popupBG = document.querySelector('.popup__bg')
const price = document.querySelector('.price-value')


const monthlyPrice = '10'
const yearlyPrice = '8'

price.textContent = yearlyPrice

monthly.addEventListener('click', () => {
    yearly.classList.remove('active')
    monthly.classList.add('active')
    monthly.href.update('https://secure.wayforpay.com/button/b69c1c9486965')
    price.textContent = monthlyPrice
    priceEnding.classList.remove('sale')
    price_desc.textContent = 'Оплачується щомісяця'
})

yearly.addEventListener('click', () => {
    monthly.classList.remove('active')
    yearly.classList.add('active')
    monthly.href.update('https://secure.wayforpay.com/button/bc6d17ab2ca82')
    price.textContent = yearlyPrice
    priceEnding.classList.add('sale')
    price_desc.textContent = 'Оплачується щороку'
})



let isOpened = false

open_menu_btn.addEventListener('click', (e) => {
    if (!isOpened) {
        popupBG.classList.add('opened')
        info_user.classList.add('opened')
        dropdown_menu.classList.add('opened')
        isOpened = true
        return
    }
})

document.addEventListener('click', (e) => {
    if (isOpened && e.target === popupBG) {
        popupBG.classList.remove('opened')
        info_user.classList.remove('opened')
        dropdown_menu.classList.remove('opened')
        isOpened = false
        return
    }
})






