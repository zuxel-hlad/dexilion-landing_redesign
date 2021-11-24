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

  /* hero section canvas BG */

  (function () {
    var renderer, scene, camera, pointCloud;
    var screenW = window.innerWidth;
    var screenH = window.innerHeight;

    var spdx = 0,
      spdy = 0;
    var mouseX = 0,
      mouseY = 0,
      mouseDown = false;
    // mouse
    document.addEventListener(
      'mousemove',
      function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
      },
      false
    );
    document.body.addEventListener(
      'mousedown',
      function (event) {
        mouseDown = true;
      },
      false
    );
    document.body.addEventListener(
      'mouseup',
      function (event) {
        mouseDown = false;
      },
      false
    );

    init();
    animate();

    function init() {
      // dom
      var container = document.getElementById('canvas');

      // renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // scene
      scene = new THREE.Scene();

      //camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 480;
      camera.position.y =30;
      camera.position.x = -350;
      if (screenW <= 1700) {
        camera.position.x = screenW / screenH - 200;
      }

      if (screenW <= 1116) {
        camera.position.y = screenH / screenW + 30;
      }

      // geometry
      var geometry = new THREE.TorusKnotGeometry(10, 200, 30, 100); //共四层形状

      // vertex colors
      var colors = [];
      for (var i = 0; i < geometry.vertices.length; i++) {
        // blue color
        colors[i] = new THREE.Color();
        colors[i].setHSL(2, 202, 192); //白色设置为1,random color:第一个值为random
      }
      geometry.colors = colors;

      // material
      material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: THREE.VertexColors,
      });

      // point cloud
      pointCloud = new THREE.Points(geometry, material);

      scene.add(pointCloud);
    }

    function animate() {
      spdy = (screenH / 2 - mouseY) / 400;
      spdx = (screenW / 2 - mouseX) / 400;
      // rotate on mousedown
      if (mouseDown) {
        pointCloud.rotation.x = spdy;
        pointCloud.rotation.y = spdx;
      }
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      // rotate 速度设置
      pointCloud.rotation.x += 0.0005;
      pointCloud.rotation.y += 0.0005;

      // render
      renderer.render(scene, camera);
    }
  })();
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
