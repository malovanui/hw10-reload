import Notiflix from 'notiflix';

const fetchCountries = (name) => { 
   
    const filter = '?fields=name,capital,population,flags,languages'
    return fetch(`https://restcountries.com/v3.1/name/${name}${filter}`)
        .then((response) => response.json());
        
        
};

export default fetchCountries;