import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMarvelService } from "../../hooks/useMarvelService";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import './singleChar.scss'

const SingleChar = () => {
  const {id} = useParams();
  const {getCharacter, loading, error, clearError} = useMarvelService();

  const [char, setChar] = useState('');

  useEffect(() => {
    getData()
  },[id])

  const getData = async () => {
    clearError();
    const char = await getCharacter(id);
    setChar(char)
  }

  const {thumbnail, name, description} = char;
  return (
    <>
      {loading && <Spinner/>}
      {error && <Error isReloadPage={true}/>}
      { (!loading && !error) ? (
        <div className="single__char">
          <img className="single__char__img" src={thumbnail} alt="Comics poster"></img>
          <div className="single__char__descr">
              <h2 className="single__char__name">{name}</h2>
              <div className="single__char__descriprion">{description ? description : "Description Not Available"}</div>
          </div>
        </div>
        ) 
        : null}
    </>
  )
}

export default SingleChar;