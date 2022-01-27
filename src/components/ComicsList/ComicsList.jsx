import { useState, useEffect } from "react";
import { useMarvelService } from "../../hooks/useMarvelService";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ComicsListItem from "../ComicsListItem/ComicsListItem";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

import classNames from 'classnames';
import "./comicsList.scss";
import "../../style/animate.scss"


const ComicsList = () => {
  const {getManyComics, loading, error, clearError} = useMarvelService();
  const [comicsList, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isEnd, setisEnd] = useState(false);

  const btnClass = classNames({
    "button button__main button__long": true,
    "disabled" : loading,
    "hide": isEnd
})

useEffect(() => { 
  getComicsList();
}, [])

 const getComicsList = async () => {
   clearError();
    const data = await getManyComics(offset);
    if (data.length < 8) setisEnd(true);
    const comicsArr = [...comicsList, ...data];
    setOffset(offset+8);
    setComics(comicsArr);
 }

 const content = comicsList.map((comics,i) => 
    <CSSTransition key={i} timeout={500} classNames="animate">
        <ComicsListItem comics={comics}/>
    </CSSTransition>
 ); //серв выдает одинаковые id, потмоу key=i
 
  return (
    <div className="comics__content">
      {error && <Error isReloadPage={true}/>}
      <TransitionGroup className="comics__list">
        {content}
      </TransitionGroup>
      {loading && <Spinner/>}
      <button onClick={getComicsList} className={btnClass} disabled={loading ? true : null}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;