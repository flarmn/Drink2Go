/* в этот файл добавляет скрипты*/

function runSlider() {
  const ImageSlider = document.querySelector('.js-image-slider');
  const sliderLeftArrow = document.querySelector('.js-left-arrow');
  const sliderRightArrow = document.querySelector('.js-right-arrow');
  const sliderStrip = document.querySelector('.js-frames-strip');
  const imageSliderNavigation = document.querySelector('.js-image-slider__navigation');
  const sliderNavigationItem = `
  <li class="slider-navigation__item js-slider-navigation__item"></li>
  `

  let framesNumber = sliderStrip.childElementCount;
  let scrollCoords = 0;
  let frameWidth = sliderStrip.scrollWidth / framesNumber;
  let rightScrollBorder = (framesNumber - 2) * frameWidth;

  if (ImageSlider.offsetWidth > 1439) {
    imageSliderNavigation.innerHTML = "";
    for(let x = 0; x <= (framesNumber-1); x++){
      imageSliderNavigation.innerHTML += sliderNavigationItem;
    }

    imageSliderNavigation.onclick = function(evt){
      if (evt.target && evt.target.matches("li.js-slider-navigation__item")) {
        let navItemIndex = Array.from(evt.target.parentNode.children).indexOf(evt.target);
        scrollCoords = navItemIndex * frameWidth;
        sliderStrip.scroll({
          top: 0,
          left: `${scrollCoords}`,
          behavior: "smooth",
        });
      }
    }
  }
  sliderStrip.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });


  sliderLeftArrow.onclick = function () {
    if (sliderStrip.scrollLeft >= frameWidth) {
      sliderStrip.scroll({
        top: 0,
        left: `${scrollCoords -= frameWidth}`,
        behavior: "smooth",
      });
    }
  }

  sliderRightArrow.onclick = function () {

    if (sliderStrip.scrollLeft <= rightScrollBorder) {
      sliderStrip.scroll({
        top: 0,
        left: `${scrollCoords += frameWidth}`,
        behavior: "smooth",
      });
    }

  }

}


function runMainMenu() {
  const header = document.querySelector('.js-header');
  const mobileMenu = document.querySelector('.js-header-menu');
  const mobileMenuButton = document.querySelector('.js-header__menu-icon');

  if (header.offsetWidth < 768) {
  mobileMenu.classList.add("visually-hidden");
  mobileMenuButton.classList.remove("visually-hidden");
  mobileMenuButton.classList.remove("header__menu-icon--close");
  mobileMenuButton.classList.add("header__menu-icon--open");
  }

  if (header.offsetWidth < 768) {
    mobileMenuButton.onclick = function () {
      if (mobileMenu.offsetHeight == 1) {
        mobileMenu.classList.remove("visually-hidden");
        mobileMenuButton.classList.remove("header__menu-icon--open");
        mobileMenuButton.classList.add("header__menu-icon--close");
      } else {
        mobileMenu.classList.add("visually-hidden");
        mobileMenuButton.classList.remove("header__menu-icon--close");
        mobileMenuButton.classList.add("header__menu-icon--open");
      }
    }
  } else {
    mobileMenuButton.classList.add("visually-hidden");
    mobileMenu.classList.remove("visually-hidden");
  }


}

function runSelect() {
  const customSelect = document.querySelector('.js-dropDown-select');
  const dropDownArrow = document.querySelector('.js-dropDown-arrow');
  const dropDownMenu = document.querySelector('.js-dropDown-menu');
  const dropDownScreen = document.querySelector('.js-dropDown-screen');
  const dropDownOptions = document.querySelectorAll('.js-dropDown-option');

  dropDownMenu.classList.add("visually-hidden");
  dropDownScreen.value = dropDownOptions[0].innerText;

  dropDownArrow.onclick = function () {
    if (dropDownMenu.offsetHeight == 1) {
      dropDownMenu.classList.remove("visually-hidden");
      dropDownArrow.classList.add("dropDown-arrow--active");
    } else {
      dropDownMenu.classList.add("visually-hidden");
      dropDownArrow.classList.remove("dropDown-arrow--active");
    }
  }

  dropDownMenu.onclick = function (evt) {
    if (evt.target && evt.target.matches("li.js-dropDown-option")) {
      dropDownScreen.value = evt.target.innerText;
      dropDownOptions.forEach((item) => item.classList.remove("dropDown-option__selected"))
      evt.target.classList.add("dropDown-option__selected");
    }
  }
}

window.onload = function () {

  slideOne();
  slideTwo();

  runMainMenu();
  runSlider();
  runSelect();
  renderMap();

};

window.onresize = function () {
  runSlider();
  runMainMenu();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  displayValOne.textContent = sliderOne.value;
  fillColor();
}
function slideTwo() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.textContent = sliderTwo.value;
  fillColor();
}
function fillColor() {
  percent1 = (sliderOne.value / sliderMaxValue) * 100;
  percent2 = (sliderTwo.value / sliderMaxValue) * 100;
  sliderTrack.style.background = `linear-gradient(to right, transparent ${percent1}% , #9070EC ${percent1}% , #9070EC ${percent2}%, transparent ${percent2}%)`;
}


function renderMap() {
  const resetButton = document.querySelector('#reset');

  const map = L.map('map')
    .setView({
      lat: 59.96831,
      lng: 30.31748,
    }, 19);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '/images/vector/map-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 59.96831,
      lng: 30.31748,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

}
