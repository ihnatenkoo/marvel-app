import ComicsList from "../ComicsList/ComicsList";
import comicsBanner from '../../resources/img/comics-banner.jpg';

const ComicsPage = () => {
  return (
    <>
      <img className="comics-banner" src={comicsBanner} alt="main banner"/>
      <ComicsList/>
    </>
  )
}

export default ComicsPage;