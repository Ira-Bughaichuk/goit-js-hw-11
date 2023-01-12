import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32790565-383584a211a893fe9ad088e3f';

const axiosGallery = axios.create({
  baseURL: BASE_URL,
});

 export function getGallery(value) {
        const config = {
           
                key: API_KEY,
                q: value,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
            
        }
        const response =  axios.get(`${ BASE_URL}`, config);
        console.log(value);
        return response;
        //axios.get(BASE_URL).then(res => console.log(res.data));

       
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
    
    
