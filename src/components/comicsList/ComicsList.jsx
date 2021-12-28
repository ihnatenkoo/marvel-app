import { useState, useEffect } from "react";
import { useMarvelService } from "../../api";
import ComicsItem from "../ComicsItem/ComicsItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import classNames from 'classnames';
import "./ComicsList.scss"


const ComicsList = () => {
  const {getManyComics, loading, error} = useMarvelService();
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
    const data = await getManyComics(offset);
    if (data.length < 8) setisEnd(true);
    const comicsArr = [...comicsList, ...data];
    setOffset(offset+8)
    setComics(comicsArr)
 }



 const content = comicsList.map((comics,i) => <ComicsItem comics={comics} key={i}/>);
 const spinner = loading ? <Spinner/> : null;
 const errorMsg = error ? <Error/> : null

  return (
    <>
      {errorMsg}
      <ul className="comics__list">
        {content}
      </ul>
      {spinner}
      <button onClick={getComicsList} className={btnClass} disabled={loading ? true : null}>
        <div className="inner">load more</div>
      </button>
    </>
    
  )
}

export default ComicsList;