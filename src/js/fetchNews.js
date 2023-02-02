
import Notiflix from 'notiflix';
const addBtn = document.querySelector(".load-more");
const axios = require('axios').default;

export default class NewsApi {
    constructor() {
        this.page = 0;
        this.inputValue = "";
    }
 
     async getNews() {
         this.addPage();
         try {
             const response = await axios.get(`https://pixabay.com/api/?key=33284507-4b4f85104b5ec42410d3af705&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
             return await response.data
         } catch (error) {
             addBtn.classList.add("is-hidden");
             this.warningMessage();
             return
         }   
        
    }
      
    addPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 0;
    }
    warningMessage() {
        const warning = Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    }
}
















