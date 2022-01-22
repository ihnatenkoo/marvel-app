import { useState } from "react";
import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import SearchPanel from "../SearchPanel/SearchPanel";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [activeChar, setActiveChar] = useState(0);

  const selectCharHandler = (charId) => {
      if (activeChar !== charId) {
          setActiveChar(charId);
      }
  }

  return (
    <>
      <RandomChar/>
        <div className="char__content">
            <CharList selectCharHandler={selectCharHandler}/>
            <div className="char__content_right-bar">
              <CharInfo activeChar={activeChar}/>
              <SearchPanel/>
            </div> 
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;