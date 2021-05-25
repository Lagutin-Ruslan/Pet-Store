const headerNavBtn = document.querySelector(".header-btn__nav");
const btnActive = document.querySelector(".header-btn__nav-active");
const headerNavList = document.querySelector(".header-nav");
const likes = document.querySelectorAll(".main-catalog__like");
const favorites = document.querySelectorAll(".main-catalog__message-favorites");
const btnUp = document.querySelector(".btn-up");
const form = document.querySelector('#form');
const email = document.querySelector('#email');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;


//блок для для открытия навигации
function clickBtnNav() {
  headerNavBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    headerNavBtn.classList.toggle("header-btn__nav-active");
    if (headerNavList.classList.contains("hidden")) {
      headerNavList.classList.remove("hidden");
    } else {
      headerNavList.classList.add("hidden");
    }
  });
}
clickBtnNav();
//

//блок для работы лайка и уведомления
likes.forEach((like, i) => {
  like.addEventListener('click', function (e) {
    if(!this.classList.contains('main-catalog__like-active')) {
      this.classList.add('main-catalog__like-active')
    } else {
      this.classList.remove('main-catalog__like-active')
    }
    favorites.forEach((favorite, j) => {
      if(like.classList.contains('main-catalog__like-active') && i === j) {
        favorite.style.display = 'block';
        setTimeout(function () {
          favorite.style.display = 'none';
        }, 2000);
      } else {
        favorite.style.display = 'none';
      }
    })
  })
})
//

//блок работы кнокпи вверх
document.documentElement.setAttribute('style', 'scroll-behavior: smooth;');
window.onscroll = function() {
  upPage()
};
function upPage () {
  if(window.pageYOffset > 600) {
    btnUp.style.display = 'block';
  } else {
    btnUp.style.display = 'none';
  }
}
btnUp.onclick = function () {
  window.scrollTo(0,0);
}
//

//блок для работы сортировки цены и возраста (поменял в HTML возраст котов, чтобы была видна сортировка)
document.querySelector('.main-sort_link-age').onclick = function (e) {
  sort ('data-age');
  e.preventDefault();
}
document.querySelector('.main-sort_link-price').onclick = function (e) {
  sort ('data-price');
  e.preventDefault();
}

function sort(sortType) {
  let sortList = document.querySelector(".main-catalog__list");
  for (let i = 0; i < sortList.children.length; i++) {
    for (let j = 0; j < sortList.children.length; j++) {
      if(+sortList.children[i].getAttribute(sortType) < +sortList.children[j].getAttribute(sortType)) {
        replacedNod = sortList.replaceChild(sortList.children[j], sortList.children[i]);
        sortList.insertBefore(replacedNod, sortList.children[j]);
      }
    }
  }
}
//

//валидация формы
function validateEmail(value) {
  return EMAIL_REGEXP.test(value);
}
function updateInput() {
  if (validateEmail(email.value)) {
    email.style.border = '2px solid green';
  } else {
    email.style.border = '2px solid red';
  }
}
email.addEventListener('input', updateInput);
//
