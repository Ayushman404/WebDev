const cancelQlFormBtn = document.getElementsByClassName('ql-form-cancel');
let addQlCardBtn = document.getElementById('ql-add-card-btn');

const qlModal = document.querySelector('#quick-link-modal');
const qlForm = document.querySelector('#quick-link-form');
const qlcardAddParent = document.getElementById('ql-card-holder');


//localstorage integration
let qlLocalData = JSON.parse(localStorage.getItem("user1")) || { quickLinks: [] };
let myQlList = qlLocalData.quickLinks || [];

//add card in the dom
function addQlCardInDom(item, index){
    // const div = document.createElement('div');
    // div.classList.add('ql-card');
    // div.setAttribute('data-card-index', index);

    let insertString = `<div class="ql-card" data-card-index="${index}">
                            <div class="ql-card-title"><i class="fas fa-file"></i>${item.title}</div>
                            <a href="${item.url}" target="_blank" class="ql-link">${item.url}</a>
                            <div class="ql-note">${item.note}</div>
                            <div class="ql-tag">${item.tag}</div>
                            <button title="Delete" class="delete-btn delete-ql-card-btn"><i class="fas fa-trash delete-btn delete-ql-card-btn"></i></button>
                        </div>
                        `;

    addQlCardBtn.insertAdjacentHTML('beforebegin', insertString);

}

// Render all quick links on page load
function renderQlCards(){
    qlcardAddParent.innerHTML = `<div class="ql-card ql-add-card" id="ql-add-card-btn">
                                <i class="fas fa-plus"></i> Add New
                                </div>
                                `;
    addQlCardBtn = document.getElementById('ql-add-card-btn');

    myQlList.forEach((item, index) => {
        addQlCardInDom(item, index);
    });

}
qlForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const myQlCardObj = {
        title: document.getElementById('ql-title').value,
        url: document.getElementById('ql-url').value,
        note: document.getElementById('ql-note').value,
        tag: document.getElementById('ql-tag').value
    }

    myQlList.push(myQlCardObj);
    qlLocalData = JSON.parse(localStorage.getItem("user1")) || { quickLinks: [] };
    qlLocalData.quickLinks = myQlList;
    localStorage.setItem("user1", JSON.stringify(qlLocalData));

    renderQlCards();

    qlModal.style.display = 'none';
    qlForm.reset();

})
//initial run
renderQlCards();

//To delete cards
document.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-ql-card-btn')){
        const cardIndex = e.target.closest('.ql-card').getAttribute('data-card-index');
        myQlList.splice(cardIndex, 1);
        qlLocalData = JSON.parse(localStorage.getItem("user1")) || { quickLinks: [] };
        qlLocalData.quickLinks = myQlList;
        localStorage.setItem("user1", JSON.stringify(qlLocalData));
        renderQlCards();
    }
})
//TO open the modal
addQlCardBtn.addEventListener('click', ()=>{
    qlModal.style.display = 'flex';
});
//Cancel button for the form
cancelQlFormBtn[0].addEventListener('click', ()=>{
    qlModal.style.display = 'none';
    qlForm.reset();
})
