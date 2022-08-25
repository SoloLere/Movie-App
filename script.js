const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const search = document.getElementById("search");
const form = document.getElementById("form");
const main = document.getElementById("main");
const error = document.getElementById('error-message')
let whatIsSearched;

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  if (data.results.length === 0) {
    error.innerText= `No results found for ${whatIsSearched}`;
  } else {
    renderMovie(data.results);
  }
}

function renderMovie(data) {
  error.innerText = '';
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;
    const movieEl = document.createElement("article");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class= ${getClassByRating(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;

    main.appendChild(movieEl);
  });
}

function getClassByRating(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Get movies from search
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  whatIsSearched = searchTerm

  if (searchTerm && searchTerm !== "") {
    const url = "".concat(SEARCH_API, searchTerm);
    getMovies(url);
    search.value = "";
    search.blur();
  } else {
    window.location.reload();
  }
});
