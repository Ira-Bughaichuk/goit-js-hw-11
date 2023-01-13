
import {  getGallery} from "./js/galleryAPI";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    formEl: document.querySelector('#search-form'),
  listEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector(".load-more"),
}
refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onMoreLoadPage);

let value = "";
let currentPage = 1;
let currentPer_page = 40;

function onSearch(e) {
  e.preventDefault();
    value = e.target.elements.searchQuery.value;
 // console.log(value); 

  refs.loadMoreBtn.hidden = false;
  currentPage = 1;
  e.target.reset();
  clearContainer();
  getCard(value);

}
async function getCard(value) {
  try {
     // getGallery(value).then(data => console.log(data.data.hits));
        const res = await getGallery(value, currentPage)
          
          if (res.data.hits.length > 0 && checkSpaces(value)) {
            renderCard(res.data.hits);
            return res;
          } else {
            throw new Error('404');
          }
        
    } catch (error) {
     Notify.failure("Sorry, there are no images matching your search query. Please try again.")
     console.log(error);
  }
  return {}
}
function onMoreLoadPage() {
  currentPage += 1;
  

  getCard(value).then((res) => {
    //console.log(res);
    let total_pages = res.data.totalHits / currentPer_page;
    Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
  
    if (currentPage >= total_pages) {
      refs.loadMoreBtn.hidden = true;
      Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  })
 
 
}

function renderCard(hits) {
    const markup = hits.map((({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
       <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" data-src="${largeImageURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b> ${downloads}
    </p>
  </div>
  </div>`
            
    })).join('');
  
  refs.listEl.insertAdjacentHTML('beforeend', markup);
  
  let gallery = new SimpleLightbox('.gallery a');
  gallery.refresh(); 
}
function clearContainer() {
    refs.listEl.innerHTML = ''; 
    
}
function checkSpaces(string) {
  return string.trim() !== '';
}
