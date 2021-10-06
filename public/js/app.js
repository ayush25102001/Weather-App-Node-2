// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()                           //to prevent immediate refresh
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{  //fetch request is made to our API ot the backend we created
        response.json().then((data) => {
            if(data.error) {
                messageOne.innerHTML = data.error
            } else {
                messageOne.innerHTML = (data.address)
                messageTwo.innerHTML = (data.forecast)     //The object in res.send would be parametrized to data
            }
        })
    })
})