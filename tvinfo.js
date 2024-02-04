// INFO SECTION SELECTORS START;
let poster = document.querySelector('.post-img');
let name = document.querySelector('.mov-name-heading')
let movRdata = document.querySelector('.mov-date');
let genresSec = document.querySelector('.genres');
let movTime = document.querySelector('.mov-time');
let ratingSec = document.querySelector('.rating-heading');
let statuss = document.querySelector('#status');
let tagline = document.querySelector('#tagline');
let overSec = document.querySelector('.over-sec');
let seasons = document.querySelector('#season');
let numEpi = document.querySelector('#num-epi');
// INFO SECTION SELECTORS END;


async function apiCall(id) {
    let url = `https://api.themoviedb.org/3/tv/${id}?api_key=d200b667c03f27a9799e244340744b29&language=en-US`;
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
    let title = value.name;
    let rDate = value.first_air_date;
    let movDura = minHour(value.episode_run_time[0])
    let year = yearGen(rDate);
    let genres = genresVal(value);
    let overView = value.overview;
    let rating = Math.floor(value.vote_average / 10 * 100) + "%";
    let status = value.status;
    let tagLine = value.tagline;
    if(tagLine == ''){
        tagLine = 'none'
    }
    document.head.querySelector('title').innerHTML = title
    // HTML ADDING SECTION START
    poster.src = posterImg;
    name.innerHTML = `${title} (${year})`;
    movRdata.innerHTML = rDate + " ";
    genresSec.innerHTML = '• ' + genres;
    movTime.innerHTML = '• ' + movDura;
    ratingSec.innerHTML = rating;
    statuss.innerHTML = 'Status:- ' + status;
    tagline.innerHTML = 'TagLine:- ' + tagLine;
    overSec.innerHTML = overView;
    seasons.innerHTML = `Number of Seasons ${value.number_of_seasons}`;
    numEpi.innerHTML = `Number of Episodes ${value.number_of_episodes}`;
    // HTML ADDING SECTION END
};




let idStr = localStorage.getItem('tvid');
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
            x : -800,
            duration : 1.5,
            opacity : 0,
        });
        timeline.from('.Overview , .theme , .rating , .facts , .mov-name , .num-value' , {
            x : 800,
            duration : 1.5,
            stagger : 0.2,
            opacity : 0,
        })
    };
})
