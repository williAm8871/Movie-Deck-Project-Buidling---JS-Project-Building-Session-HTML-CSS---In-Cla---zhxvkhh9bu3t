const key = 'f531333d637d0c44abc85b3e74db2186';
const api = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US;`

const movieListingTag = document.querySelector('.movieListing');
const ImageUrl = 'https://image.tmdb.org/t/p/original';
let currentPage = 1;
let currentMoviedataForSorting = '';

const sortbyRating = document.querySelector(".sort-by-rating");
let sortBydateMovieData = '';
let sortByratingMovieData = '';
let isSortbyDate = false;
let isSortbyRating = false;

//assining events to btn

document.querySelector(".previous-btn").addEventListener('click',(()=>{     //previous btn logic
    if(currentPage === 1){
        return;
    }
    currentPage--;
    getpaginationmovieData(currentPage);
}));

document.querySelector(".next-btn").addEventListener('click', ()=>{        //nextBtn logic
    if(currentPage === 3){
        return;
    }
    currentPage++;
    getpaginationmovieData(currentPage);
});

//btn that will sort the movie sort-by-date-btn
document.querySelector(".sort-by-date").addEventListener('click', handleSortByRating);
function handleSortByRating({vote_average}){
    console.log(vote_average);
}




function updateMoviepage(moviearray) {
    let updataMovieListing = '';
    for (let { title, vote_count, vote_average, poster_path } of moviearray) {
        let postrUrl = `${ImageUrl}/${poster_path}`
        let moviecard = `<div class="movie-card-body">
                            <div class="movie-image">
                                <img src="${postrUrl }" alt="movie-image">
                            </div>
                            <div class="movie-title">
                                <div class="movie-title-div">${title}</div>
                            </div>
                            <div class="movie-vote-section">
                                <div>
                                    <div class="movie-vote">Votes: ${vote_count}</div>
                                    <div class="movie-rating">Rating: ${vote_average}</div>
                                </div>
           
                                <div>
                                    <span class="movie-fev-icon">
                                        <i class="fa-regular fa-heart fa-2x"></i>
                                    </span>
                                </div>
                            </div>
                        </div>`
        updataMovieListing += moviecard;
    }
    movieListingTag.innerHTML = updataMovieListing;
    


}

//CALLING MAIN API FOR GETTING ALL THE DATA
async function getpaginationmovieData(page = 1) {
    resetmovieValues();
    const response = await fetch(`${api}&page=${page}`);
    const moviedata = await response.json();
    currentMoviedata = moviedata;
    updateMoviepage(moviedata.results);
    handleSortByRating(currentMoviedata);
}
getpaginationmovieData(currentPage);

//previousBtn logic

function resetmovieValues(){
    sortBydateMovieData = '';
    sortByratingMovieData = '';
    isSortbyDate = false;
    isSortbyRating = false;
}

