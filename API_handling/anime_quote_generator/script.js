const generateQuoteButton = document.getElementById("generate-quote-btn");
const themeSelect = document.getElementById("theme-selecter");

const quoteCard = document.getElementById("quote-card");
const quoteText = document.getElementById("quote-text");
const quoteMeta = document.getElementById("quote-meta");

//Taking the quote from Local JSON file
let quotesData =[];

window.onload = async ()=>{
    //Fetch local JSON files
    const res = await fetch('quotes.json');
    quotesData = await res.json();
};

function displayQuote(quote) {
  quoteText.innerText = `"${quote.quote}"`;
  quoteMeta.innerText = `${quote.character} - ${quote.anime}`;
}

function generateQuote() {
    const anime = themeSelect.value;

    //filter quotes for different animes
    const filteredQuotes = quotesData.filter(quote => quote.anime.toLowerCase() === anime.toLowerCase());

    //Picking a random quote
    const randomQuote = filteredQuotes[Math.floor(Math.random()*filteredQuotes.length)];

    displayQuote(randomQuote);
};


//Changing the background of the body on theme selection
themeSelect.addEventListener('change', ()=>{

    const body = document.querySelector('body');
    const theme = themeSelect.value;

    if(theme.toLowerCase() === 'one piece'){
        body.style.backgroundImage = "url('./images/one_piece_background_dark_red.png')";
    }
    else if(theme.toLowerCase() === 'naruto'){
        body.style.backgroundImage = "url('./images/naruto_background_dark.jpg')";
    }
    else{
        body.style.backgroundImage = "url('./images/aot_bg_scouts.png')";
    }
});

