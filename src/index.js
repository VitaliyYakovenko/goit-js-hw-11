
import NewsApi from "./js/fetchNews";
import Notiflix from 'notiflix';

const formEl = document.getElementById("search-form");
const inputEl = document.querySelector("input");
const listImg = document.querySelector(".gallery");
const objNews = new NewsApi();
const loadMoreBtn = document.querySelector(".load-more");

const counter = {
    count: 40,
}

formEl.addEventListener("submit", async (e) => {

    e.preventDefault();
    objNews.inputValue = inputEl.value.trim();
    objNews.resetPage();
    loadMoreBtn.classList.add("is-hidden");
    e.target.reset();
    counter.count = 40;
    try {
        const img = await objNews.getNews();   
        const amountImg = img.totalHits;

        if (img.hits.length === 0) {
            
            warningMessage();
            listImg.innerHTML = "";
            return
        }
        
            if (img.hits.length !== img.totalHits) {
                 loadingBtn();
            }

            if (objNews.inputValue === "") {
                warningMessage();
                loadMoreBtn.classList.add("is-hidden");
                listImg.innerHTML = "";
                return
            }
            
  
        successMessage(img);
        addMarkupSubmit(img);
        showBtn()
    } catch (error) {
        console.log(error);
    }
});



loadMoreBtn.addEventListener("click", async () => { 

    try {
        loadingBtn()
        const img = await objNews.getNews();
        const amountImg = img.totalHits;
        counter.count += 40;
        addMarkupClick(img);
        if (amountImg <= counter.count) {
            const warning = Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            loadMoreBtn.classList.add("is-hidden");
            return;
        }       
         showBtn()
          
    } catch (error) {
        console.log(error);
    }
  
});



function createMarkup({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) {  
    return `
      <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="190" height="120"/>
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


function successMessage({ totalHits }) {
    const success = Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function warningMessage() {
    const warning = Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}


function addMarkupSubmit(img) {
      const markup = img.hits.reduce((acc, elem) => {
            return createMarkup(elem) + acc
        }, ""); 
       
       listImg.innerHTML = markup;
}


function addMarkupClick(img) {
     const markup = img.hits.reduce((acc, elem) => {
            return createMarkup(elem) + acc
     }, "");
     listImg.insertAdjacentHTML("beforeend", markup);
}




function loadingBtn() {
    loadMoreBtn.classList.remove("is-hidden");
    loadMoreBtn.textContent = "Loading..."
    loadMoreBtn.style.backgroundColor = "grey";
    loadMoreBtn.disabled = true;
}


function showBtn() {
    loadMoreBtn.textContent = "Load more"
    loadMoreBtn.style.backgroundColor = "rgb(50, 50, 189)";
    loadMoreBtn.disabled = false;
}






