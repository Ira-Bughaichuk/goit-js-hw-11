import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32790565-383584a211a893fe9ad088e3f';


 export function getGallery(value) {
        const config = {
                key: API_KEY,
                q: value,
                image_type: "photo",
                orientation: "horizontal",
            safesearch: "true",
            page: 1,
            per_page: 40,
            
        }
     const response = axios.get(`${BASE_URL}`,{ params: config }).then(data =>console.log(data));
        return response;

       
    } 

    // incrementPage() {
    //     this.page += 1;
    // }
    // resetPage() {
    //     this.page = 1;
    // }
    // set value(newValue) {
    //     this.value = newValue;
    // }
    // get value() {
    //     return this.value;
    // }
    
    
