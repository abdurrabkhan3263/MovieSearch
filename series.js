const tmApiKey = `d200b667c03f27a9799e244340744b29`;
let newlyPage = 1;
let newI = 0;
let movCount = 20;
let newlyBoxSec = document.querySelector('#newly-box-card');
let newHtmlData = '';


// https://api.themoviedb.org/3/discover/movie?api_key=${tmApiKey}&with_genres=${genId}&page=${newlyPage}


gsap.from('#Newly' , {
    y : 20,
    duration : 1.1,
    opacity : 0,
})


async function newlyReleaseApi() {
    let response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${tmApiKey}&page=${newlyPage}`)
        .then(result => {
            if (!result.ok) {
                throw new error('Something.....goes.....wrong');
            }
            return result.json();
        })
        .then(data => {
            if (newlyPage > 156) {
                gsap.to('#newly-btn', {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                })
                return;
            }
            newlyReleaseHtmlFunc(data.results);
        })
        .catch(error => {
            console.log(error);
        })
};


function newlyReleaseHtmlFunc(data) {
    for (newI; newI < movCount; newI++) {
        if (data[newI].poster_path === null) {
            continue;
        }
        newHtmlData += `
        <div class="cards">
        <div id="${data[newI].id}" style="display: none;"></div>
        <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${data[newI].poster_path}" alt="">
    </div>`
    }
    newlyBoxSec.innerHTML = newHtmlData;
    gsap.from('.cards', {
        y: 13,
        duration : 0.5,
        opacity : 0,
    });
    document.querySelectorAll('.cards').forEach(value=>{
        value.addEventListener('mouseenter' , (event)=>{
            gsap.to(event.target , {
                scale : 1.01,
                y: -5,
                duration : 0.5,
            });
        })
        value.addEventListener('mouseleave' , (event)=>{
            gsap.to(event.target , {
                scale : 1,
                y: 0,
                duration : 0.5,
            });
        });
    });
}

window.addEventListener('load', () => {
    newlyReleaseApi();
})

document.querySelector('#newly-btn').addEventListener('click', (event) => {
    newI = 0;
    movCount = 20;
    newlyPage++;
    newlyReleaseApi();
});


function addLocId(location) {
    location.addEventListener('click', (event) => {
        if (event.target.matches('img')) {
            let parentDiv = event.target.parentNode;
            let id = parentDiv.firstElementChild.id;
            localStorage.setItem('tvid', JSON.parse(id));
            window.location.href = 'tvinfo.html';
        };
    });
}

addLocId(newlyBoxSec);


gsap.to('#main' , {
    backgroundColor : 'black',
    scrollTrigger:{
        trigger : '.page1',
        scroller : 'body',
        start : 'top 0',
        end : 'top -25%',
        scrub : 2,
    }
})

// CARD ANIMATION;

let pages = document.querySelector('.page1');


async function apiCall(title) {
    let response = fetch(`https://api.themoviedb.org/3/search/tv?api_key=d200b667c03f27a9799e244340744b29&language=en-US&page=1&query=${title}`);
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
    if (!dataVal.length == 0) {
        let allCards = document.createElement('div');
        allCards.classList.add('all-cards');
        allCards.innerHTML = htmlImg;
        pages.appendChild(allCards);
    } else {
        let allCards = document.createElement('div');
        allCards.classList.add('all-cards');
        allCards.innerHTML = `<h1>Sorry......Not>>>>>>Found</h1>`;
        pages.appendChild(allCards);
    }
    document.querySelectorAll('.cards').forEach(value => {
        value.addEventListener('mouseenter', (event) => {
            gsap.to(event.target, {
                scale: 1.01,
                y: -5,
                duration: 0.5,
            });
        })
        value.addEventListener('mouseleave', (event) => {
            gsap.to(event.target, {
                scale: 1,
                y: 0,
                duration: 0.5,
            });
        });
    });
    let serCards = document.querySelector('.all-cards');
    addLocId(serCards);
}
let serBtn = document.querySelector('#mainSerBtn');
let serVal = document.querySelector('#mov-search')
let mobileSer = document.querySelector('#mobileSer-btn');
let mobileInput = document.querySelector('#mobileSer-input');
mobileSer.addEventListener('click' , ()=>{
    if (mobileInput.value == '') {
        return;
    }
    htmlImg = '';
    apiCall(mobileInput.value);
    checkSec();
})
serBtn.addEventListener('click', () => {
    if (serVal.value == '') {
        return;
    }
    htmlImg = '';
    apiCall(serVal.value);
})