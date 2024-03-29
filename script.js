let searchBtn = document.getElementById("search-btn");
let userInput = document.getElementById("country-name");
let result = document.getElementById("result");
searchBtn.addEventListener("click", () => runApp());
function runApp(){
    let countryName = userInput.value;
    const api = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    getData(api).catch(() => {
        if (countryName.length == 0){
            result.innerHTML = `
            <h3>
            The input field cannot be empty.
            </h3>
            `;
        }else {
            result.innerHTML = `
            <h3>
            Please enter a valid country name.
            </h3>
            `;
        }
    });
    
}
async function getData(api){
    const response = await fetch(api);
    const data = await response.json();
    showData(data);
}
function showData(data){
    result.innerHTML = `
    <img src="${data[0].flags.svg}" class = "flag-img">
    <h2>${data[0].name.common}</h2>
    <div class = "wrapper">
        <div class = "data-wrapper">
            <h4>Official Name: </h4>
            <span>${data[0].name.official}</span>
        </div>
    </div>
    <div class = "wrapper">
        <div class = "data-wrapper">
            <h4>Capital: </h4>
            <span>${data[0].capital[0]}</span>
        </div>
    </div>
    <div class = "wrapper">
        <div class = "data-wrapper">
            <h4>Continent: </h4>
            <span>${data[0].continents[0]}</span>
        </div>
    </div>
    <div class = "wrapper">
        <div class = "data-wrapper">
            <h4>Population: </h4>
            <span>${data[0].population}</span>
        </div>
    </div>
    <div class = "wrapper">
        <div class = "data-wrapper">
            <h4>Currency: </h4>
            <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</span>
        </div>
    </div>
    <div class = "wrapper">
        <div class = "data-wrapper">
            <h4>Common Languages: </h4>
            <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span>
        </div>
    </div>
    `;
}
