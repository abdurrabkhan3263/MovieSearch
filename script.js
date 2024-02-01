// PAGE ANIMATION PART START
let searchIcon = document.querySelector('.search-icon');
let searchContainer = document.querySelector('.search-section');

searchIcon.addEventListener('click', () => {
    let dispValue = (searchContainer.style.display == "none") ? 'flex' : 'none';
    searchContainer.style.display = dispValue;
});

gsap.to('#main', {
    backgroundColor: 'black',
    scrollTrigger: {
        trigger: '.movies-section',
        scroller: 'body',
        start: 'top 40%',
        end: 'top 5%',
        scrub: 2,
    }
});

// PAGE ANIMATION PART END


// PAGE SEARCH CODE START

const tmApiKey = `d200b667c03f27a9799e244340744b29`
const apiKey = '2db3461b';

async function apiCall(title) {
    let response = fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmApiKey}&language=en-US&page=1&query=${title}`);
    if ((await response).ok) {
        response = (await response).json()
            .then(result => {
                getData(result);
            }).catch(error => {
                console.log(error);
            })
    } else {
        return;
    }
}

let htmlImg = '';
let pages = document.querySelector('.pages');

async function getData(data) {
    let dataVal = data.results;
    pages.innerHTML = '';
    dataVal.forEach(value => {
        if (value.poster_path === null) {
            return;
        }
        htmlImg += `
        <div class="cards">
        <div id="${value.id}" style="display: none;"></div>
        <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${value.poster_path}" alt="">
    </div>`
    })
    if(!dataVal.length == 0){
        let allCards = document.createElement('div');
        allCards.classList.add('all-cards');
        allCards.innerHTML = htmlImg;
        pages.appendChild(allCards);
    }else{
        let allCards = document.createElement('div');
        allCards.classList.add('all-cards');
        allCards.innerHTML = `<h1>Sorry......Not>>>>>>Found</h1>`;
        pages.appendChild(allCards);
    }
}

let serBtn = document.querySelector('.search-btn');
let serVal = document.querySelector('#mov-search')

serBtn.addEventListener('click' , ()=>{
    if(serVal.value == ''){
        return;
    }
    htmlImg = '';
    apiCall(serVal.value);
})


// PAGE SEARCH CODE END


// TOP RATED SECTION START 


const tBtn = document.querySelector('#t-load');
const tPageSec = document.querySelector('#t-all-cards');

let loadNum = 6;
let i = 0;
let page = 1;
let topHtmlData = '';
async function topRated() {
    let topUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmApiKey}&page=${page}`;
    let response = await fetch(topUrl);
    response = await response.json();
    let data = await response.results;
    for (i; i < loadNum; i++) {
        topHtmlData += `
        <div class="cards">
        <div id="${data[i].id}" style="display: none;"></div>
        <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${data[i].poster_path}" alt="">
    </div>
        `
    };
    tPageSec.innerHTML = topHtmlData;
}

window.addEventListener('load', () => {
    topRated();
})

tBtn.addEventListener('click', () => {
    if (loadNum === 18) {
        i = 0;
        loadNum = 0;
        page++;
    }
    topRated();
    loadNum += 6;
})


// TOP RATED SECTION END


// MOVIES ALL CATEGORIES START

const changeCat = (data) => {
    
}


const catValue = document.querySelector('.cat-cat');
const catBtn = document.querySelectorAll('.mov-sec')
catBtn.forEach(item => {
    item.addEventListener('click', (event) => {
        catBtn.forEach(value => {
            if (value.hasAttribute('id')) {
                value.removeAttribute('id');
            }
        })
        if (!event.target.hasAttribute('id')) {
            event.target.setAttribute('id', 'mov-sec-w');
            catValue.innerHTML = event.target.innerHTML;
            changeCat(event.target.innerHTML);
        }
    });
});


// MOVIES ALL CATEGORIES END


// MOVIE ALL DETAILS SECTION START

const movCards = document.querySelectorAll('.cards');
movCards.forEach(value=>{
    console.log(value)
    value.addEventListener('click' , (event)=>{
        console.log(value)
    })
})


tPageSec.addEventListener('click' , (event)=>{
    if(event.target.matches('img')){
        let parentDiv = event.target.parentNode;
        let id = parentDiv.firstElementChild.id;
        localStorage.setItem('id' , JSON.parse(id));
        window.open('info.html');
    }
})


// MOVIE ALL SECTION END