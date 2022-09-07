console.log('Client side JS is loaded')

/*
fetch('https://puzzle.mead.io/puzzle').then((res)=> {
    console.log(res)
    res.json().then((data)=> {
        console.log(data)
    })
})
*/
/*

*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (evt)=> {
    evt.preventDefault()

    const location = search.value
    console.log('Testing on ' + location)

    message1.textContent='loading ...'

    const weatherUrl = 'http://localhost:3000/weather?address='+location
    fetch(weatherUrl).then((res)=> {

        const resOk = res.ok

        res.json().then((data)=> { 
            
            if (resOk) {
                message1.textContent = "Temp: " + data.temperature + ". Rain: " + data.precip + ". Location: " + data.location
                message2.textContent = ''
            } 
            else {
                message1.textContent = ''
                message2.textContent = data.error
            }            
        }).catch((err)=> {
            message1.textContent = ''
            message2.textContent = err
            console.log(err)
        }) 

    }).catch((err)=> {
            message1.textContent = ''
            message2.textContent = err
            console.log(err)
    })

})