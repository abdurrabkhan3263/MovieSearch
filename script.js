// PAGE ANIMATION PART START
let searchIcon = document.querySelector('.search-icon');
let searchContainer = document.querySelector('.search-section');

searchIcon.addEventListener('click', () => {
    let dispValue = (searchContainer.style.display == "none") ? 'flex' : 'none';
    searchContainer.style.display = dispValue;
});


document.querySelectorAll('.mov-sec').forEach(item => {
    item.addEventListener('click', (event) => {
        document.querySelectorAll('.mov-sec-w').forEach(item => {
            item.classList.remove('mov-sec-w');
            item.classList.add('mov-sec');
            document.querySelector('.cat-m-card').firstElementChild.innerHTML = event.target.innerHTML;
        });
        item.classList.remove('mov-sec');
        item.classList.add('mov-sec-w');
        document.querySelector('.cat-m-card').firstElementChild.innerHTML = event.target.innerHTML;
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
        if(img == 'N/A'){
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

submitBtn.addEventListener('click' , (event)=>{
    if(!serMov.value == ''){
        htmlImg = '';
        apiCall(serMov.value);
    }
    else{
        return;
    }
})