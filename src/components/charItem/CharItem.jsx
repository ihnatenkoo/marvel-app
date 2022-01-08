import { useRef, useEffect } from "react";

const CharItem = ({char, selectCharHandler, getRef, i, getActiveFocus}) => {
  const imageNA1 = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  const imageNA2 = "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif";

  const isObjectFit = (thumbnail, imageNA1, imageNA2) => {
      if (thumbnail === imageNA1 || thumbnail === imageNA2) {
          return {objectFit: "contain"}
      }
      return null;
  }

  useEffect(() => {
    getRef(itemRef, i)
  }, [])

  const itemRef = useRef(null);

  return (
      <div onClick={() => {selectCharHandler(char?.id); getActiveFocus(i)}}
          ref={itemRef}
          className="char__item" data-id={char.id}>
          <img src={char.thumbnail} alt="abyss" style={isObjectFit(char?.thumbnail, imageNA1, imageNA2)}/>
          <div className="char__name">{char.name}</div>
      </div>   
  )
}

export default CharItem;