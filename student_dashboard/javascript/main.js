

//putting date in the nav-header
const navDate = document.getElementById('nav-header-date')

setInterval(()=>{
    let myDate = new Date();

    navDate.innerHTML = `${myDate.toLocaleDateString("en-IN")}`;
}, 1000)


const navBtns = document.getElementsByClassName('nav-btns');

const removeActive = function(){
    if(navBtns[0].classList.contains('nav-active')){
        navBtns[0].classList.remove('nav-active');
    }
    if(navBtns[1].classList.contains('nav-active')){
        navBtns[1].classList.remove('nav-active');
    }
    if(navBtns[2].classList.contains('nav-active')){
        navBtns[2].classList.remove('nav-active');
    }
    if(navBtns[3].classList.contains('nav-active')){
        navBtns[3].classList.remove('nav-active');
    }
    // if(navBtns[4].classList.contains('nav-active')){
    //     navBtns[4].classList.remove('nav-active');
    // }
    // if(navBtns[4].classList.contains('nav-active')){
    //     navBtns[4].classList.remove('nav-active');
    // }
}

navBtns[0].addEventListener('click', ()=>{
    removeActive();
    navBtns[0].classList.add('nav-active');
    
})
navBtns[1].addEventListener('click', ()=>{
    removeActive();
    navBtns[1].classList.add('nav-active');
})
navBtns[2].addEventListener('click', ()=>{
    removeActive();
    navBtns[2].classList.add('nav-active');
})
navBtns[3].addEventListener('click', ()=>{
    removeActive();
    navBtns[3].classList.add('nav-active');
})


function toggleSidebar() {
  document.querySelector("nav").classList.toggle("active");
  //toggling the visiblity of hamburger icon
  const hamburgerIcon = document.querySelector("#nav-toggle-btn");
    if (document.querySelector("nav").classList.contains("active")) {
        hamburgerIcon.innerHTML = `<i class="fas fa-times"></i>`;
    } else {
        hamburgerIcon.innerHTML = `<i class="fas fa-bars"></i>`;
    }
}

document.querySelectorAll(".nav-btns").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        document.querySelector("nav").classList.remove("active");
        const hamburgerIcon = document.querySelector("#nav-toggle-btn");
        hamburgerIcon.innerHTML = `<i class="fas fa-bars"></i>`;
      }
    });
  });



const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-btns");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-btns[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("nav-active"));
        if (navLink) navLink.classList.add("nav-active");
      }
    });
  }, {
    root: null,
    threshold: 0.6 // Adjust this value based on when you want it to trigger
  });

  sections.forEach(section => observer.observe(section));