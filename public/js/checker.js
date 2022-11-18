const button = document.querySelector('.send_value')
const input = document.querySelector('#code')

input.addEventListener('input', () => {
    button.disabled = input.value === ''
})
