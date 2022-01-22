import { useState, useEffect } from 'react';
import { useMarvelService} from '../../hooks/useMarvelService';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import './singleComics.scss';
import '../../style/button.scss';

const SingleComics = () => {
  const {id} = useParams();

  const [comics, setComics] = useState({});
  const {getComics, loading, error, clearError} = useMarvelService();

  async function getData() {
    clearError();
    const data = await getComics(id);
    setComics(data);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      { (!loading && !error) && <View comics={comics}/>}
      { loading && <Spinner/> }
      { error && <Error isReloadPage="true"/> }
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