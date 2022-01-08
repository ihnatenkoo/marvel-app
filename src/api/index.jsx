import { useHttp } from "../hooks/http.hook";

export const useMarvelService = () => {
  const {loading, error, clearError, fetchURL} = useHttp();
  const _apiKey = 'apikey=d766f253562e5fc93e2b548ec7741077';

  function transformDataFromChar(data) {
    const {id, name, description, thumbnail, urls, comics} = data;
    return {
      id,
      name,
      description,
      thumbnail: thumbnail.path + "." + thumbnail.extension,
      wiki: urls[0]?.url,
      homepage: urls[1]?.url,
      comics: comics.items.map(item => item.name)
    }
  }

  function transformDataFromComics(data) {
    const {id, thumbnail, title, prices} = data;
    return {
      id,
      title,
      thumbnail: thumbnail.path + "." + thumbnail.extension,
      printPrice: prices[0]?.price, 
      digitalPrice: prices[1]?.price
    }
  }

  function transformDataFromSingleComics(data) {
    const {description, pageCount, prices, thumbnail, title, urls} = data;
    return {
      title,
      description, 
      pageCount, 
      printPrice: prices[0]?.price, 
      digitalPrice: prices[1]?.price, 
      detail: urls[0]?.url,
      thumbnail: thumbnail.path + "." + thumbnail.extension
    }
  }

  async function getCharacter(id) {
    const response = await fetchURL(`https://gateway.marvel.com:443/v1/public/characters/${id}?${_apiKey}`);
    return transformDataFromChar(response.data.results[0]);
  }

  async function getManyCharacters(offset=200, qty=9) {
    const responce = await fetchURL(`https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=${qty}&${_apiKey}`);
    return responce.data.results.map(char => transformDataFromChar(char));
  }

  async function getManyComics(offcet=0, qty=8) { 
    const responce = await fetchURL(`https://gateway.marvel.com:443/v1/public/comics?orderBy=-title&limit=${qty}&offset=${offcet}&${_apiKey}`);
    return responce.data.results.map(comics => transformDataFromComics(comics));
  }

  async function getComics(id) {
    const response = await fetchURL(`https://gateway.marvel.com:443/v1/public/comics/${id}?${_apiKey}`);
    return transformDataFromSingleComics(response.data.results[0]);
  }


  return {getCharacter, getManyCharacters, getManyComics, getComics, loading, error, clearError}
}





