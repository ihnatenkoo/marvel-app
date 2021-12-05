const CharItem = ({char, selectCharHandler}) => {
  const imageNA1 = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  const imageNA2 = "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif";

  const isObjectFit = (thumbnail, imageNA1, imageNA2) => {
      if (thumbnail === imageNA1 || thumbnail === imageNA2) {
          return {objectFit: "contain"}
      }
      return null;
  }

  return (
      <li onClick={() => selectCharHandler(char?.id)}
          className="char__item" data-id={char.id}>
          <img src={char.thumbnail} alt="abyss" style={isObjectFit(char?.thumbnail, imageNA1, imageNA2)}/>
          <div className="char__name">{char.name}</div>
      </li>   
  )
}

export default CharItem;