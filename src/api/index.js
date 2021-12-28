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

  function transformDataDataFromComics(data) {
    const {id, thumbnail, title, urls, prices} = data;
    return {
      id,
      title,
      thumbnail: thumbnail.path + "." + thumbnail.extension,
      detail: urls[0]?.url,
      price: prices[0]?.price
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
    return responce.data.results.map(comics => transformDataDataFromComics(comics))
  }


  return {getCharacter, getManyCharacters, getManyComics, loading, error, clearError}
}





