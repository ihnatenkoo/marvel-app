import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [activeChar, setActiveChar] = useState(null);

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
            <CharInfo activeChar={activeChar}/>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;