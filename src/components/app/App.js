import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [activeChar, setActiveChar] = useState(null);

    const selectCharHandler = (charId) => {
        if (activeChar !== charId) {
            setActiveChar(charId);
        }
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList selectCharHandler={selectCharHandler}/>
                    <CharInfo activeChar={activeChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
    
    
}

export default App;