'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// typewriter title effect
const typewriterText = document.querySelector(".typewriter-text");

if (typewriterText) {

  const titles = [
    "Automotive & Autonomous Systems Engineer",
    "Embedded AI & IoT Engineer",
    "Computer Vision Engineer",
    "Mechanical Engineer"
  ];

  let titleIndex = 0;
  let charIndex = titles[0].length;
  let isDeleting = true;

  const typeLoop = function () {
    const current = titles[titleIndex];
    let delay = 60;

    if (isDeleting) {
      charIndex--;
      typewriterText.textContent = current.slice(0, charIndex);
      delay = 35;

      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        delay = 400;
      }
    } else {
      charIndex++;
      typewriterText.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isDeleting = true;
        delay = 1800;
      }
    }

    setTimeout(typeLoop, delay);
  };

  setTimeout(typeLoop, 1800);

}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// project lightbox variables
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxVideo = document.querySelector("[data-lightbox-video-player]");
const lightboxCloseElems = document.querySelectorAll("[data-lightbox-close]");
const projectLinks = document.querySelectorAll(".project-item > a");

// reset and hide the lightbox
const closeLightbox = function () {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
  lightboxImg.hidden = true;
  lightboxVideo.pause();
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load();
  lightboxVideo.hidden = true;
};

// open lightbox on project click
for (let i = 0; i < projectLinks.length; i++) {
  projectLinks[i].addEventListener("click", function (event) {

    const videoSrc = this.dataset.lightboxVideo;
    const thumb = this.querySelector("img, video");
    if (!videoSrc && !thumb) return;

    event.preventDefault();

    if (videoSrc) {
      lightboxImg.hidden = true;
      lightboxVideo.hidden = false;
      lightboxVideo.src = videoSrc;
      lightboxVideo.play();
    } else {
      lightboxVideo.hidden = true;
      lightboxImg.hidden = false;
      lightboxImg.src = this.dataset.lightboxFull || thumb.src;
      lightboxImg.alt = thumb.alt || "";
    }

    lightbox.classList.add("active");

  });
}

// close lightbox
for (let i = 0; i < lightboxCloseElems.length; i++) {
  lightboxCloseElems[i].addEventListener("click", closeLightbox);
}

// close lightbox on Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}