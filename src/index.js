import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');


const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
    country: undefined,
};
const DEBOUNCE_DELAY = 300;

const createCountriesList = (countries) => { 
    if (countries.length === 1) { 
        if (refs.country) {
            return;
            
        }
       
        refs.list.innerHTML = '';
        const markup = `<div class="country">
        <img src="${countries[0].flags.svg}" alt="" width="80px" height="45px" class="country__flag">
        <p class="country__name">${countries[0].name.official}</p>
        <ul class="country__info-list">
        <li class="country__item capital">${countries[0].capital}</li>
        <li class="country__item population">${countries[0].population}</li>
        <li class="country__item languages">${Object.values(countries[0].languages)}</li>
        </ul>
        </div>`
       
        
        refs.list.insertAdjacentHTML('afterend', markup);
        refs.country = document.querySelector('.country');
        return;
    };

    if (refs.country) { 
        refs.country.remove();
        refs.country = undefined;
    };
    const markupList = countries.map(country => {
        return `<li class="country-list__item">
                <img src="${country.flags.svg}" alt="" width="20px" height="15px" class="country-list__item-flag">
                <p class="country-list__item-name">${country.name.official}</p>
                 </li>`
    }).join('');

    refs.list.insertAdjacentHTML('beforeend', markupList);
};




const onInput = (e) => { 
    if (!refs.input.value) {
        refs.list.innerHTML = '';
        if (refs.country) { 
            refs.country.remove();
            refs.country = undefined;
        };
      
        return
    };
    if (refs.input.value.length === 1) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        return;
    }
    refs.list.innerHTML = '';
    const query = e.target.value.trim();
    fetchCountries(query)
        .then((countries) => createCountriesList(countries))
        .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name'));
};
// ------ Event Listeners
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));