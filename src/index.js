import NewsApi from "./js/fetchNews";
import Notiflix from 'notiflix';

const formEl = document.getElementById("search-form");
const inputEl = document.querySelector("input");
const listImg = document.querySelector(".gallery");
const addBtn = document.querySelector(".load-more");

const objNews = new NewsApi();

formEl.addEventListener("submit", onSubmitFom);
addBtn.addEventListener("click", onClickAddNews);


function onSubmitFom(e) {
    e.preventDefault();
    
    objNews.inputValue = inputEl.value.trim();
    objNews.resetPage();
    objNews.getNews()
    .then(img => {
        if (img.hits.length === 0) {
                
            const warning = Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            listImg.innerHTML = "";
            addBtn.classList.add("is-hidden");
            return
            }
    
        const success = Notiflix.Notify.success("Hooray! We found 500 images.")
        const markup = img.hits.reduce((acc, elem) => {
            return createMarkup(elem) + acc
        }, "");
       
        listImg.innerHTML = markup;
        addBtn.classList.remove("is-hidden");
    }).finally(() => {
        e.target.reset();
    })
};



function onClickAddNews() {
    objNews.getNews().then(img => {
        const markup = img.hits.reduce((acc, elem) => {
            return createMarkup(elem) + acc
        }, "");
       
        listImg.insertAdjacentHTML("beforeend", markup);
    })
}


function createMarkup({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) {
    
    return `
      <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="200"/>
       <div class="info">
         <p class="info-item">
          <b>Likes ${likes}</b>
          </p>
    <p class="info-item">
      <b>Views ${views}</b>
        </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
     <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
     </div>
    `
}















