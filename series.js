const tmApiKey = `d200b667c03f27a9799e244340744b29`;
let newlyPage = 1;
let newI = 0;
let movCount = 20;
let newlyBoxSec = document.querySelector('#newly-box-card');
let newHtmlData = '';





// https://api.themoviedb.org/3/discover/movie?api_key=${tmApiKey}&with_genres=${genId}&page=${newlyPage}


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
            window.open('tvinfo.html');
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
