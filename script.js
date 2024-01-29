// PAGE ANIMATION PART START
let searchIcon = document.querySelector('.search-icon');
let searchContainer = document.querySelector('.search-section');

searchIcon.addEventListener('click', () => {
    let dispValue = (searchContainer.style.display == "none") ? 'flex' : 'none';
    searchContainer.style.display = dispValue;
});

// FUNCTION

const changeCat = (data) => {
    console.log(data)
}

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
            changeCat(event.target.innerHTML);
        }
    });
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


const tmApiKey = `d200b667c03f27a9799e244340744b29`
const apiKey = '2db3461b'


async function apiCall(title) {
    let response = fetch(`http://www.omdbapi.com/?s=${title}&page=1&apikey=${apiKey}`);
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
    let dataVal = data.Search;
    pages.innerHTML = '';
    dataVal.forEach(value => {
        let img = value.Poster;
        if (img == 'N/A') {
            return;
        }
        htmlImg += `
        <div class="cards">
        <img src="${img}" alt="">
    </div>`;
        console.log(img)
    })
    let allCards = document.createElement('div');
    allCards.classList.add('all-cards');
    allCards.innerHTML = htmlImg;
    pages.appendChild(allCards);
}

let submitBtn = document.querySelector('.search-btn');
let serMov = document.querySelector('#mov-search');

submitBtn.addEventListener('click', (event) => {
    if (!serMov.value == '') {
        htmlImg = '';
        apiCall(serMov.value);
    }
    else {
        return;
    }
})











// TOP RATED SECTION START 
const tBtn = document.querySelector('#t-load');
const tPageSec = document.querySelector('#t-all-cards');

let loadNum = 6;
let i = 0;
let page = 1;
let topHtmlData = '';
async function topRated(){
    let topUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=d200b667c03f27a9799e244340744b29&page=${page}`;
    let response = await fetch(topUrl);
    response = await response.json();
    let data = await response.results;
    for(i ; i < loadNum ; i++){
        topHtmlData += `
        <div class="cards">
        <div id="${data[i].id}" style="display: none;"></div>
        <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${data[i].poster_path}" alt="">
    </div>
        `
    };
    tPageSec.innerHTML = topHtmlData;
}

topRated()

tBtn.addEventListener('click' , ()=>{
    if(loadNum === 18){
        i = 0;
        loadNum = 6;
        page++;
    }
    topRated();
    loadNum += 6;
})
// TOP RATED SECTION END