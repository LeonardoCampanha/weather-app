const apiKey = 'YOUR API KEY'
const lang = 'en_us'


document.querySelector('.search').addEventListener('submit', async (event) => {
    event.preventDefault()

    const inputElement = document.querySelector('#searchInput').value

    if (inputElement !== '') {
        clearInfo()
        showWarning('Loading...')
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(inputElement)}&appid=${apiKey}&units=metric&lang=${lang}`
            let result = await fetch(url)
            let json = await result.json()

            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        } catch (err) {
            clearInfo()
            console.log(showWarning('Location not found'))
        }

    } else {
        clearInfo()
    }
})

function showInfo(json) {
    showWarning('')
    document.querySelector('.result').style.display = 'block'
    document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.windInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.windPoint').style.transform = `rotate(${json.windAngle - 90}deg)`
}

function showWarning(msg) {
    document.querySelector('.warning').innerHTML = msg
}
function clearInfo() {
    showWarning('')
    document.querySelector('.result').style.display = 'none'

}

