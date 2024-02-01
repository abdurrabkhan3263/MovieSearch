// INFO SECTION SELECTORS START;
let poster = document.querySelector('.post-img');
let name = document.querySelector('.mov-name-heading')
let movRdata = document.querySelector('.mov-date');
let genresSec = document.querySelector('.genres');
let movTime = document.querySelector('.mov-time');
let ratingSec = document.querySelector('.rating-heading');
let tagLineSec = document.querySelector('.tagline');
let overSec = document.querySelector('.over-sec');

// INFO SECTION SELECTORS END;


async function apiCall(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=d200b667c03f27a9799e244340744b29&language=en-US`;
    let response = await fetch(url)
        .then(result => {
            if (!result.ok) {
                throw new error("Sorry.....Erorrrrrr")
            }
            return result.json();
        })
        .then(data => {
            htmlData(data);
        })
}

function yearGen(data) {
    let year = '';
    for (i = 0; i < data.length; i++) {
        if (data[i] !== '-') {
            year += data[i];
        } else {
            i = data.length;
        }
    }
    return year;
}

function genresVal(data) {
    let gen = [];
    let genres = data.genres;
    genres.forEach(value => {
        gen.push(value.name);
    });
    return gen.join(',');
}

function minHour(runtime) {
    let hour = Math.floor(runtime / 60);
    let minute = Math.floor(runtime % 60);
    let finalVal = `${hour}h ${minute}m`
    return finalVal;
}

function htmlData(value) {
    let posterImg = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${value.poster_path}`;
    let title = value.title;
    let rDate = value.release_date;
    let movDura = minHour(value.runtime)
    let year = yearGen(rDate);
    let genres = genresVal(value);
    let overView = value.overview;
    let rating = Math.floor(value.vote_average / 10 * 100) + "%";
    let tagLine = value.tagline;

    // HTML ADDING SECTION START
    poster.src = posterImg;
    name.innerHTML = `${title} (${year})`;
    movRdata.innerHTML = rDate + " ";
    genresSec.innerHTML = '• ' + genres;
    movTime.innerHTML = '• ' + movDura;
    ratingSec.innerHTML = rating;
    tagLineSec.innerHTML = tagLine;
    overSec.innerHTML = overView;

    // HTML ADDING SECTION END

};







let idStr = localStorage.getItem('id');
if (idStr !== NaN) {
    let id = parseInt(idStr);
    apiCall(id);
}


document.addEventListener('readystatechange', () => {
    let timeline = gsap.timeline();
    if (document.readyState === 'complete') {
        timeline.to('.info-loader', {
            y: -100 + '%',
            delay: 0.8,
            duration : 1,
        });
        timeline.from('.info-img' , {
            x : -500,
            duration : 1.5,
            opacity : 0,
        });
        timeline.from('.Overview , .theme , .rating , .facts , .mov-name ' , {
            y : 800,
            duration : 1,
            stagger : 0.2,
            opacity : 0,
        })
    };

    // else if(document.readyState === 'interactive'){
    //     console.log('inhetansive')
    // }
})