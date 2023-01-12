
import { getGallery } from "./js/galleryAPI";

const refs = {
    formEl: document.querySelector('#search-form'),
    listEl: document.querySelector('.gallery'),
}
refs.formEl.addEventListener('submit', onSearch);



async function onSearch(e) {
    e.preventDefault();
   

    value = e.target.elements.searchQuery.value;
    console.log(value);
    
    getGallery(value).then(data =>console.log(data) )
    // try {
    //     const card = await galleryApi.getGallery(value)
    //         .then(hits=> renderCard(hits));
    //     console.log(hits);
    // } catch(error) {
    //      console.log("error")
    // }
      
    
    
   // console.log(galleryApi);
    // if (galleryApi.value === '')
    //     return console.log("Sorry, there are no images matching your search query. Please try again.") 
}

function renderCard(hits) {
    const markup = hits.map((({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" data-src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
            
    })).join('');
    refs.listEl.insertAdjacentHTML('beforeend', markup);
}
