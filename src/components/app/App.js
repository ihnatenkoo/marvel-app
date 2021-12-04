import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        activeChar: null
    }

    onClickCharList = (event) => {
        if (event.target && event.target.classList.contains("char__item")) {
            this.setState({
                activeChar: event.target.dataset.id
            })
        }
    }

    selectCharHandler = (charId) => {
        // Проверяем, а выбранный персонаж уже выбран?
        // Если нет - изменяем состояние
        if (this.state.activeChar !== charId)
            this.setState({
                activeChar: charId,
            });
    }

    render() {
        const {activeChar} = this.state;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList
                            selectCharHandler={this.selectCharHandler}
                            onClickCharList={this.onClickCharList}
                        />
                        <CharInfo activeChar={activeChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;