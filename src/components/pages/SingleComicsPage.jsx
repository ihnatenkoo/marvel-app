import { useParams } from "react-router-dom";

import ComicsBanner from "../ComicsBanner/ComicsBanner";
import SingleComics from "../SingleComics/SingleComics";

const SingleComicsPage = () => {
  const {id} = useParams();

  return (
    <>
      <ComicsBanner/>
      <SingleComics comicsId={id}/>
    </>
   
  )
}

export default SingleComicsPage;