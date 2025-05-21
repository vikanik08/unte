document.addEventListener('DOMContentLoaded', function() {

  // кнопки размеров
  const smBtn = document.getElementById('sm-btn');
  const lxlBtn = document.getElementById('lxl-btn');
  
  if (smBtn && lxlBtn) {
      function toggleActive(activeBtn, inactiveBtn) {
          activeBtn.classList.add('clicked');
          inactiveBtn.classList.remove('clicked');
      }
      
      smBtn.addEventListener('click', function() {
          toggleActive(smBtn, lxlBtn);
      });
      
      lxlBtn.addEventListener('click', function() {
          toggleActive(lxlBtn, smBtn);
      });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
    }
  });

// Универсальная функция для управления модальными окнами
function setupModal(triggerId, modalId) {
  const trigger = document.getElementById(triggerId);
  const modal = document.getElementById(modalId);
  
  if (trigger && modal) {
    const closeBtn = modal.querySelector('.close');
    const body = document.body;
    
    trigger.addEventListener('click', () => {
      modal.style.display = 'block';
      body.classList.add('body-no-scroll');
    });
    
    const closeModal = () => {
      modal.style.display = 'none';
      body.classList.remove('body-no-scroll');
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => e.target === modal && closeModal());
  }
}

// все модальные окона
setupModal('delivery', 'deliveryModal'); // Для окна доставки
setupModal('offerTrigger', 'offerModal'); // Для окна оферты
setupModal('delivery-mobile', 'deliveryModal'); // Для мобильного окна доставки


  //Swiper 
  const swiper = new Swiper('.swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 5, // расстояние между слайдами
    grabCursor: true,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    speed: 600,
    breakpoints: {
      320: { // мобильные
        slidesPerView: 1.2,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: { // планшеты
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      1024: { // десктопы
        slidesPerView: 'auto',
        spaceBetween: 40,
      },
    }
  });

  // Бургер-меню
  const burgerBtn = document.getElementById("burgerBtn");
  const menuCloseBtn = document.getElementById("closeBtn");
  const menu = document.getElementById("menu");
  
  if (burgerBtn && menuCloseBtn && menu) {
      burgerBtn.addEventListener("click", () => {
          menu.classList.add("active");
      });

      menuCloseBtn.addEventListener("click", () => {
          menu.classList.remove("active");
      });
  }

  // Таблица размеров (мобильная версия)
  const toggleButton = document.querySelector('.mobile-toggle');
  const table = document.querySelector('.size-chart');
  
  if (toggleButton && table) {
      if (window.innerWidth <= 768) {
          table.style.display = 'none';
      }
      
      toggleButton.addEventListener('click', function() {
          if (table.style.display === 'none' || table.style.display === '') {
              table.style.display = 'table';
              toggleButton.textContent = '';
          } else {
              table.style.display = 'none';
              toggleButton.textContent = '';
          }
      });
  }

  function setupSmoothScroll(linkId, targetId) {
    const link = document.getElementById(linkId);
    if (link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Для десктопных элементов
setupSmoothScroll('about-link', 'screen-5');
setupSmoothScroll('contacts', 'footer');

// Для мобильных элементов
setupSmoothScroll('about-link-mobile', 'screen-5');
setupSmoothScroll('contacts-mobile', 'footer');

});