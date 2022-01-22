const CharInfoContent = ({char}) => {
  let {name, description, thumbnail, comics, homepage, wiki} = char;

  const calculateComicsList = (comicsList) => {
      if (comics.length === 0) return "No comics for this character";
      return comicsList.map((item,i) => {return (
          <li className="char__comics-item" key={i}>
             {item}
          </li>
      )})
  }

  return (
      <>
      <div className="char__basics">
          <img src={thumbnail} alt="abyss"/>
          <div>
              <div className="char__info-name">{name}</div>
              <div className="char__btns">
                  <a href={homepage} className="button button__main" target="_blank" rel="noreferrer">
                      <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer">
                      <div className="inner">Wiki</div>
                  </a>
              </div>
          </div>
      </div>
      <div className="char__descr">
          {description.length === 0 ? "Description not Available": description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
          {calculateComicsList(comics)}
      </ul>    
    </> 
  )
}

export default CharInfoContent;