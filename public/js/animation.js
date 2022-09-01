const monthly = document.querySelector('.monthly-btn')
const yearly = document.querySelector('.yearly-btn')
const info_user = document.querySelector('.info_user')
const dropdown_menu = document.querySelector('.dropdown_menu')
const open_menu_btn = document.getElementById('open_menu_btn')
const price_desc = document.querySelector('.price-description')
const priceEnding = document.querySelector('.price-ending')

const price = document.querySelector('.price-value')

const monthlyPrice = '10'
const yearlyPrice = '8'

price.textContent = yearlyPrice

monthly.addEventListener('click', () => {
    price.textContent = monthlyPrice
    priceEnding.classList.remove('sale')
    price_desc.textContent = 'Оплачується щомісяця'
})

yearly.addEventListener('click', () => {
    price.textContent = yearlyPrice
    priceEnding.classList.add('sale')
    price_desc.textContent = 'Оплачується щороку'
})



let isOpened = false

open_menu_btn.addEventListener('click', event => {
    if (!isOpened) {
        info_user.classList.add('opened')
        dropdown_menu.classList.add('opened')
        isOpened = true
        return
    }

    info_user.classList.remove('opened')
    dropdown_menu.classList.remove('opened')
    isOpened = false
})


