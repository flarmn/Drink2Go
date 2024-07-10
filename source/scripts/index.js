/* в этот файл добавляет скрипты*/

function runSlider(){
  const sliderLeftArrow = document.querySelector('.js-left-arrow');
  const sliderRightArrow = document.querySelector('.js-right-arrow');
  const sliderStrip = document.querySelector('.js-frames-strip');
  let framesNumber = sliderStrip.childElementCount;
  let scrollCoords = 0;
  let rightScrollBorder =   (framesNumber -2) * 280;
  let leftScrollBorder = sliderStrip.scrollWidth - ( (framesNumber -3) * 280);



  sliderLeftArrow.onclick = function(){
    if(sliderStrip.scrollLeft >= 280 ){
      sliderStrip.scroll({
        top: 0,
        left: `${scrollCoords -= 280}`,
        behavior: "smooth",
      });
    }
  }

  sliderRightArrow.onclick = function(){
    //console.log("right arrow clicked -> ", sliderStrip.scrollWidth, " -> ", sliderStrip.scrollLeft, " -> ", scrollCoords, "elements number = ", framesNumber, rightScrollBorder);
    if(sliderStrip.scrollLeft <= rightScrollBorder ){
      sliderStrip.scroll({
        top: 0,
        left: `${scrollCoords += 280}`,
        behavior: "smooth",
      });
    }

  }

}


function runMainMenu(){
  const mobileMenu = document.querySelector('.js-header-menu');
  const mobileMenuButton = document.querySelector('.js-header__menu-icon');
  mobileMenu.classList.add("visually-hidden");

  mobileMenuButton.onclick = function(){
    if( mobileMenu.offsetHeight == 1){
      mobileMenu.classList.remove("visually-hidden");
    }else{
      mobileMenu.classList.add("visually-hidden");
    }
  }

}

runMainMenu();
runSlider();
