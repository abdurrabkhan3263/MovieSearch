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

// ADDING ID INTO LOCALSTORAGE

function addLocId(location) {
    location.addEventListener('click', (event) => {
        if (event.target.matches('img')) {
            let parentDiv = event.target.parentNode;
            let id = parentDiv.firstElementChild.id;
            localStorage.setItem('id', JSON.parse(id));
            window.open('info.html');
        };
    });
}



// PAGE SEARCH CODE START

const tmApiKey = `d200b667c03f27a9799e244340744b29`;

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
}
let serBtn = document.querySelector('.search-btn');
let serVal = document.querySelector('#mov-search')

serBtn.addEventListener('click', () => {
    if (serVal.value == '') {
        return;
    }
    htmlImg = '';
    apiCall(serVal.value);
})

addLocId(pages)

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

let genresObj = [{
    Action: 28,
    Fantasy: 14,
    Animation: 16,
    Drama: 18,
    Horror: 27,
    ScienceFiction: 878,
    Thriller: 53,
    Comedy: 35,
    Documentary: 99
}]


const catValue = document.querySelector('.cat-cat');
const catBtn = document.querySelectorAll('.mov-sec');
const genresCard = document.querySelector('#genres-card');
let genHtmlData = '';
let genI = 0;
let genCount = 10;
let genPage = 1;
let genId = 28;
catBtn.forEach(item => {
    item.addEventListener('click', (event) => {
        genHtmlData = '';
        let innerHTML = event.target.innerHTML;
        let id = genresObj[0][`${innerHTML}`];
        genId = id;
        findGenres(genId);
        genI = 0;
        genCount = 10;
        catBtn.forEach(value => {
            if (value.hasAttribute('id')) {
                value.removeAttribute('id');
            }
        })
        if (!event.target.hasAttribute('id')) {
            event.target.setAttribute('id', 'mov-sec-w');
            catValue.innerHTML = event.target.innerHTML;
        }
    });
});

function findGenres() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmApiKey}&with_genres=${genId}&page=${genPage}`)
        .then(result => {
            if (!result.ok) {
                throw new error('SomeThing.....Goes.......Wrong');
            }
            else {
                return result.json();
            }
        })
        .then(data => {
            if (genPage > 499) {
                gsap.to('#genres-btn', {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                })
                return;
            }
            genHtmlFunc(data.results);
        })
}

function genHtmlFunc(data) {
    for (genI; genI < genCount; genI++) {
        if (genI === 20) {
            genI = 0;
            genCount = 10;
            genPage++;
            findGenres(genId);
            return;
        }
        if (data[genI].poster_path === null) {
            continue;
        }
        genHtmlData += `
        <div class="cards">
        <div id="${data[genI].id}" style="display: none;"></div>
        <img src="https://media.themoviedb.org/t/p/w220_and_h330_face${data[genI].poster_path}" alt="img">
    </div>`
    }
    genresCard.innerHTML = genHtmlData;
    gsap.from('.cards', {
        y: 13,
        duration: 0.5,
        opacity: 0,
    });
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
}

document.querySelector('#genres-btn').addEventListener('click', (event) => {
    genI = genCount;
    genCount += 10;
    findGenres(genId);
});

window.addEventListener('load', () => {
    let id = document.querySelector('#mov-sec-w').innerHTML
    findGenres(genId);
})

addLocId(genresCard);

// MOVIES ALL CATEGORIES END


// MOVIE ALL DETAILS SECTION START


tPageSec.addEventListener('click', (event) => {
    if (event.target.matches('img')) {
        let parentDiv = event.target.parentNode;
        let id = parentDiv.firstElementChild.id;
        localStorage.setItem('id', JSON.parse(id));
        window.open('info.html');
    }
})


// MOVIE ALL SECTION END


// NEWLY RELEASE SECTION START

let newlyPage = 1;
let newI = 0;
let movCount = 10;
let newlyBoxSec = document.querySelector('#newly-box-card');
let newHtmlData = '';

async function newlyReleaseApi() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmApiKey}&language=en-US&page=${newlyPage}`)
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
        if (newI === 20) {
            newI = 0;
            movCount = 10;
            newlyPage++;
            newlyReleaseApi();
            return;
        }
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
}

window.addEventListener('load', () => {
    newlyReleaseApi();
})

document.querySelector('#newly-btn').addEventListener('click', (event) => {
    newI = movCount;
    movCount += 10;
    newlyReleaseApi();
});

addLocId(newlyBoxSec);


// NEWLY RELEASE SECTION END