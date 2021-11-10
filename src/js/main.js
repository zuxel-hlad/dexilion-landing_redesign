document.addEventListener('DOMContentLoaded', () => {
  /* mobile burger */
  const burger = document.querySelector('.burger-menu'),
    headerWrapper = document.querySelector('.header-nav-wrapper'),
    headerLinks = document.querySelectorAll('.nav-list-link');

  const mobileMenuToggler = () => {
    burger.classList.toggle('active');
    headerWrapper.classList.toggle('active');
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuToggler();
  });

  headerLinks.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target === item) {
        mobileMenuToggler();
      }
    });
  });

  /* if mobile menu open and click outside */
  document.addEventListener('click', (e) => {
    let target = e.target;
    let its_menu = target == headerWrapper || headerWrapper.contains(target);
    let its_hamburger = target == burger;
    let menu_is_active = headerWrapper.classList.contains('active');

    if (!its_menu && !its_hamburger && menu_is_active) {
      mobileMenuToggler();
    }
  });

  /* smooth scroll to anchor */
  const anchors = document.querySelectorAll('a[data-anchor]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  /* title counter animation */

  const titleCounterAnimation = () => {
    const sectionTitles = document.querySelectorAll('.animated-title'),
      dexilionCounter = document.querySelectorAll('.dexilion-counter');
    sectionTitles.forEach((item, i) => {
      item.addEventListener('animationend', () => {
        dexilionCounter[i].classList.add('active');
      });
    });
  };
  titleCounterAnimation();
});

/* jQuery content-ready */

$(document).ready(function () {
  $('.roadmap-progress-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    initialSlide: 0,
    dots: true,
  });
});

/* WOW js animations */

new WOW().init();
