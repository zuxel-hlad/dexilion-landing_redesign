document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger-menu'),
    headerWrapper = document.querySelector('.header-nav-wrapper'),
    headerLinks = document.querySelectorAll('.nav-list-link');
  /* mobile burger */

  const mobileMenuActive = () => {
    burger.classList.add('active');
    headerWrapper.classList.add('active');
  };

  const mobileMenuRemoveActive = () => {
    burger.classList.remove('active');
    headerWrapper.classList.remove('active');
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!burger.classList.contains('active')) {
      mobileMenuActive();
    } else {
      mobileMenuRemoveActive();
    }
  });

  headerLinks.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target === item) {
        mobileMenuRemoveActive();
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
      mobileMenuRemoveActive();
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
});

/* wowjs init */
const wow = new WOW({
  mobile: false,
}).init();

/* link actives */

$(document).ready(function () {
  let screenWidth = $(window).width();

  if (screenWidth <= 1100) {
    return false;
  } else {
    jQuery(window).scroll(function () {
      var $sections = $('.section');
      $sections.each(function (i, el) {
        var top = $(el).offset().top - 550;
        var bottom = top + $(el).height();
        var scroll = $(window).scrollTop();
        var id = $(el).attr('id');
        if (scroll > top && scroll < bottom) {
          $('a.active').removeClass('active');
          $('a[href="#' + id + '"]').addClass('active');
        }
      });
    });
  }
});
