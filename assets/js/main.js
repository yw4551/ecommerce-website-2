/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav_menu');
const navToggle = document.getElementById('nav_toggle');
const navClose = document.getElementById('nav_close');

/*===== Menu Show =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add("show-menu");
  })
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  })
}

/*===== Search =====*/
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header-search .form-input');
  const searchBtn = document.querySelector('.search-btn');
  const productsContainer = document.querySelector('.products-container');
  const totalProductsSpan = document.querySelector('.total-products span');

  function performSearch(event) {
      if (event) {
          event.preventDefault();
      }
      
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      // אם אנחנו לא בעמוד המוצרים
      if (!productsContainer) {
          // שמירת ערך החיפוש ב-localStorage לפני המעבר
          localStorage.setItem('pendingSearch', searchTerm);
          window.location.href = `shop.html`;
          return;
      }

      const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );

      displayFilteredProducts(filteredProducts);
  }

  function displayFilteredProducts(filteredProducts) {
      if (totalProductsSpan) {
          totalProductsSpan.textContent = filteredProducts.length;
      }

      productsContainer.innerHTML = filteredProducts.map(product => `
          <div class="product-item">
              <div class="product-banner">
                  <a href="details.html?id=${product.id}" class="product-images">
                      <img src="${product.image}" alt="" class="product-img default">
                      <img src="${product.images[0]}" alt="" class="product-img hover">
                  </a>
                  <div class="product-actions">
                      <a href="#" class="action-btn" aria-label="Quick View">
                          <i class="fi fi-rs-eye"></i>
                      </a>
                      <a href="#" class="action-btn" aria-label="Add To Wishlist">
                          <i class="fi fi-rs-heart"></i>
                      </a>
                      <a href="#" class="action-btn" aria-label="Compare">
                          <i class="fi fi-rs-shuffle"></i>
                      </a>
                  </div>
              </div>
              <div class="product-content">
                  <span class="product-category">${product.category}</span>
                  <h3 class="product-title">${product.name}</h3>
                  <div class="product-price flex">
                      <span class="new-price">$${product.price}</span>
                  </div>
              </div>
          </div>
      `).join('');
  }

  if (searchBtn) {
      searchBtn.addEventListener('click', performSearch);
  }

  if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              performSearch(e);
          }
      });
  }

  // בדיקת חיפוש ממתין ב-localStorage
  if (productsContainer) {
      const pendingSearch = localStorage.getItem('pendingSearch');
      if (pendingSearch) {
          searchInput.value = pendingSearch;
          performSearch();
          localStorage.removeItem('pendingSearch');
      }
  }
});


/*=============== IMAGE GALLERY ===============*/
function imageGallery() {
  const mainImg = document.querySelector('.details-img');
  const smallImg = document.querySelectorAll('.details-small-img');

  smallImg.forEach((img) => {
    img.addEventListener('click', function () {
      mainImg.src = img.src;
    });
  });
};

imageGallery();

/*=============== SWIPER CATEGORIES ===============*/
var swiperCategories = new Swiper(".categories-container", {
    spaceBetween: 24,
    loop: true,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  breakpoints: {
        350: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
      },
});

function getUrlParameter(name) {
  const urlPrams = new URLSearchParams(window.location.search);
  return urlPrams.get(name);
}

function displayProductsByCategory() {
  const category = getUrlParameter('category') || 'all';
  const productsContainer = document.querySelector('.products-container');
  const totalProductsSpan = document.querySelector('.total-products span');

  const filteredProducts = category === 'All' 
      ? products 
      : products.filter(product => product.category === category);
  
  totalProductsSpan.textContent = filteredProducts.length;
  
  productsContainer.innerHTML = '';

  filteredProducts.forEach(product => {
    const productHTML = `
        <div class="product-item">
            <div class="product-banner">
                <a href="details.html?id=${product.id}" class="product-images">
                    <img src="${product.image}" alt="" class="product-img default">
                    <img src="${product.images[1]}" alt="" class="product-img hover">
                </a>
                <div class="product-actions">
                    <a href="#" class="action-btn" aria-label="Quick View">
                        <i class="fi fi-rs-eye"></i>
                    </a>
                    <a href="#" class="action-btn" aria-label="Add To Wishlist">
                        <i class="fi fi-rs-heart"></i>
                    </a>
                    <a href="#" class="action-btn" aria-label="Compare">
                        <i class="fi fi-rs-shuffle"></i>
                    </a>
                </div>
            </div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <a href="details.html?id=${product.id}">
                    <h3 class="product-title">${product.name}</h3>
                </a>
                <div class="product-rating">
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                    <i class="fi fi-rs-star"></i>
                </div>
                <div class="product-price flex">
                    <span class="new-price">$${product.price}</span>
                </div>
                <a href="#" class="action-btn cart-btn" aria-label="Add To Cart">
                    <i class="fi fi-rs-shopping-bag-add"></i>
                </a>
            </div>
        </div>
    `;
    productsContainer.innerHTML += productHTML;
    });
}

document.addEventListener('DOMContentLoaded', displayProductsByCategory);

function initializeCategoryNavigation() {
  const categoryItems = document.querySelectorAll('.category-item');
  
  categoryItems.forEach(item => {
      item.addEventListener('click', (e) => {
          e.preventDefault();
          const category = item.querySelector('.category-title').textContent;
          
          const newUrl = `${window.location.pathname}?category=${category}`;
          window.history.pushState({ category }, '', newUrl);
      
          displayProductsByCategory();
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayProductsByCategory();
  initializeCategoryNavigation();
  
  window.addEventListener('popstate', () => {
      displayProductsByCategory();
  });
});

/*=============== SWIPER PRODUCTS ===============*/
var swiperProducts = new Swiper(".new-container", {
  spaceBetween: 24,
  loop: true,
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active-tab');
    });
    target.classList.add('active-tab');
    tabs.forEach((tab) => {
      tab.classList.remove('active-tab');
    });
    tab.classList.add('active-tab');
  })
})