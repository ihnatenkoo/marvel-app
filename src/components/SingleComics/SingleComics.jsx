import { useState, useEffect } from 'react';
import { useMarvelService} from '../../api/index';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './SingleComics.scss';
import '../../style/button.scss';

const SingleComics = ({comicsId}) => {
  const [comics, setComics] = useState({});
  const {getComics, loading, error, clearError} = useMarvelService();

  async function getData() {
    clearError();
    const data = await getComics(comicsId);
    setComics(data);
  }

  useEffect(() => {
    getData()
  }, [])

  const content = !loading && !error ? <View comics={comics}/> : null;
  const spinner = loading ? <Spinner/> : null;
  const errorMsg = error ? <Error isReloadPage="true"/> : null;

  return (
    <>
      {content}
      {spinner}
      {errorMsg}
    </>

  )
}

const View = ({comics}) => {
  const {description, pageCount, printPrice, digitalPrice, thumbnail, title, detail} = comics;

  return (
    <div className="single__comics">
        <img className="single__comics__img" src={thumbnail} alt="Comics poster"></img>
        <div className="single__comics__descr">
            <h2 className="single__comics__title">{title}</h2>
            <div className="single__comics__descriprion">{description}</div>
            <div className="single__comics__pages">Pages: <span>{pageCount}</span></div>
            <div className="single__comics__prices"><span>Print price:</span> {printPrice ? printPrice + "$" : "Not Available"}</div>
            <div className="single__comics__prices"><span>Digital price:</span> {digitalPrice ? digitalPrice + "$" : "Not Available"}</div>
            <button className="button__buy__comics">
              <a href={detail} target="_blank" rel="noreferrer">Buy it</a>
            </button>
        </div>
        <Link className="single__comics__back-link" to="/comics"><span>Back to all</span></Link>
    </div>
  )
}

export default SingleComics;