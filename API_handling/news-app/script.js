const searchForm = document.getElementById('search-form');
const searchText = document.getElementById('search-text');
let readMoreBtns = document.querySelectorAll('.read-more');
const cardContainer = document.getElementById('card-container');



//Categories selection
const categorySelect = document.getElementById('category-select');
const categoryOptions = document.querySelectorAll('.category-option');

let selectedCategory = categorySelect.value;

categorySelect.addEventListener('change', (e)=>{
    selectedCategory = e.target.value;
    console.log(selectedCategory);
    categoryOptions.forEach((option)=>{
        if(option.value === selectedCategory){
            option.classList.add('selected');
        }else{
            option.classList.remove('selected');
        }
    })
})
// API key: bb0a3c01a2c4f217229d2f957ce49579


// API endpoint for top headlines

async function getNews(){
    let res;
    if(searchText.value === ""){
        
        res = await fetch(`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=in&max=10&apikey=bb0a3c01a2c4f217229d2f957ce49579`);
        console.log("Normal");
    }else{
        
        res = await fetch(`https://gnews.io/api/v4/search?q=${String(searchText.value)}&lang=en&country=in&max=10&apikey=bb0a3c01a2c4f217229d2f957ce49579`);
        console.log("Search")
    }
    const data = await res.json();
    console.log(data);
    
    try{
        cardContainer.innerHTML = "";
        data.articles.forEach(article=>{
            const div = document.createElement('div');
            div.classList.add('card-item');
            div.innerHTML = `<div class="cardTitle">${article.title}</div>
            <div class="news-para">
            ${article.description}
            <button class="read-more">Read More</button>
            <div class="more-info-none">
            ${article.content}
            <br>
            <p>Source: ${article.source.name}</p><br>
            <p>Published At: ${new Date(article.publishedAt).toLocaleString()}</p>
            </div>
            </div>
            
            `;
            cardContainer.appendChild(div);
        });
        readMoreBtns = document.querySelectorAll('.read-more');
    }catch(error){
        console.error(error);
    }
    
}
window.onload = getNews();

searchForm.addEventListener('submit', (e)=>{
    
    e.preventDefault();
    getNews();
    searchText.value = "";
})

//expand card on clicking read more buttons
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('read-more')){
        const extraPara = e.target.nextElementSibling;
        if(extraPara.classList.contains('more-info-none')){
            extraPara.classList.remove('more-info-none');
            extraPara.classList.add('more-info-flex');
            e.target.innerText = "Read Less";
        }else{
            extraPara.classList.remove('more-info-flex');
            extraPara.classList.add('more-info-none');
            e.target.innerText = "Read More";
        }
    }
})

//collapsing extra para on clicking outside
document.addEventListener('click', (e)=>{
    if(!e.target.classList.contains('read-more')){
        readMoreBtns.forEach((btn)=>{
            const extraPara = btn.nextElementSibling;
            extraPara.classList.remove('more-info-flex');
            extraPara.classList.add('more-info-none');
            btn.innerText = "Read More";
        })
    }
})
