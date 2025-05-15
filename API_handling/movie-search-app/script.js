const input = document.getElementById('search-movie');
const searchBtn = document.getElementById('search-btn');
const statusMsg = document.getElementById('status-message');
const results = document.getElementById('main-content');
searchBtn.addEventListener('click', async () => {
    // results.innerHTML = `<div id="status-message"></div>`;
    
    const query = input.value.trim();
    if (!query) return;
    
    try{
        statusMsg.innerHTML = `<div class = "spinner"></div>`;
        const res = await fetch(`https://www.omdbapi.com/?apikey=31fec275&s=${query}`);
        const data = await res.json();
        console.log(data);

        if(data.Response === "False"){
            throw new Error(data.Error);
        }
        
        statusMsg.innerHTML = "";
        renderResults(data.Search);
    }catch(error){
        statusMsg.textContent = `${error}`;
    }

});

function renderResults(movies) {
    results.innerHTML = `<div id="status-message"></div>`;

    movies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie-card';
        div.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" />
            <div class="movie-data">
                <span id="movie-title">${movie.Title}</span>
                <span id="movie-date">${movie.Year}</span>
            </div>
        `;
        results.appendChild(div);
    });
}
