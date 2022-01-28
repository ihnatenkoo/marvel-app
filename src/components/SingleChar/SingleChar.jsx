import { useSelector } from "react-redux";

import './singleChar.scss'

const SingleChar = () => {
  const {searchedChar} = useSelector(state => state)

  const {thumbnail, name, description} = searchedChar;

  return (
        <div className="single__char">
          <img className="single__char__img" src={thumbnail} alt="Comics poster"></img>
          <div className="single__char__descr">
              <h2 className="single__char__name">{name}</h2>
              <div className="single__char__descriprion">{description ? description : "Description Not Available"}</div>
          </div>
        </div>
        ) 
}

export default SingleChar;