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

    render() {
        const {activeChar} = this.state;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onClickCharList={this.onClickCharList}/>
                        <CharInfo activeChar={activeChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;