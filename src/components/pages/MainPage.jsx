import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import SearchPanel from "../SearchPanel/SearchPanel";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  return (
    <>
      <RandomChar/>
        <div className="char__content">
            <CharList/>
            <div className="char__content_right-bar">
              <CharInfo/>
              <SearchPanel/>
            </div> 
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;