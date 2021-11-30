async function fetchURL(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    }
  }
  catch {
    console.log("Ошибка загрузки данных...") 
  }
}

function transformData(data) {
  const {id, name, description, thumbnail, urls} = data;

  return {
    id,
    name,
    description,
    thumbnail: thumbnail.path + "." + thumbnail.extension,
    wiki: urls[0].url,
    homepage: urls[1].url
  }
}

export async function getCharacter(id) {
  const response = await fetchURL(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=d766f253562e5fc93e2b548ec7741077`);
  return transformData(response.data.results[0]);
}

export async function getManyCharacters(offset=200, qty=9) {
  const responce = await fetchURL(`https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=${qty}&apikey=d766f253562e5fc93e2b548ec7741077`);
  return responce.data.results.map(char => transformData(char));
}



