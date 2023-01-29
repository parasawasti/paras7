let input = document.getElementById('input')
let btn = document.getElementById('btn');
let result = document.getElementById('result')
let superHerpResult = document.getElementById('superHerpResult')

let superheros =JSON.parse(localStorage.getItem('superheros')) || [];

function searchSuperHero(){
    let inputValue = input.value;

    if(inputValue == ""){
        alert("Add some input");
        return;
    }
    fetch(`https://www.superheroapi.com/api.php/1628132770683309/search/${inputValue}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);

        superheros = data.results;
        localStorage.setItem('superheros' , JSON.stringify(data.results));

        for (let index = 0; index < data.results.length; index++) {
            renderSuperHero(data.results[index] , index);
        }

    })
    .catch(err =>{
        console.log(err , "Sorry no data found...");
    })

    input.value= "";
}



function renderSuperHero(data , index){
    let div = document.createElement('div');
    div.id = index;
    div.onclick = (event)=>{
        handleSuperheroClick(event)
    }
    div.innerHTML = 
    `
     <h1>${data.name}</h1>
     <img src="${data.image.url}" />
    `
    div.classList.add('superherocards');
    result.appendChild(div);
}

function handleSuperheroClick(event){
    let superheros =JSON.parse(localStorage.getItem('superheros')) || [];
    const index = event.target.id;
    window.open("superherogets.html")
    console.log(superheros , index);
    console.log(event.target);
    setTimeout((superheros , index)=>{
        renderSuperHeroDetails(superheros[index]);
    }, 3000)
    
}

function renderSuperHeroDetails(data){
    console.log(data);
    let div = document.createElement('div');

    div.innerHTML = 
    `
        <h1>${data.name}</h1>
        <img src="${data.image.url}" />    
    `

    superHerpResult.appendChild(div); 


    document.querySelector('.connections').innerHTML = `
    <li>
        <span>group--affiliation</span>
        <span>${data[0].connections['group-affiliation']}</span>
    </li>
    <li>
        <span>relatives</span>
        <span>${data[0].connections['relatives']}</span>
    </li>
    `;

    document.querySelector('.biography').innerHTML = ` 
    <li>
        <span>full name</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-apperance</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `;

} 
 
btn.addEventListener('click' , searchSuperHero);