
console.log("Client side js running")



const weatherForm = document.querySelector('form')
const inputLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    const location = inputLocation.value
    if (!location) {
        console.log('Please Provide Location')
    }
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = ""
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})