import { Component } from 'react';
import { getManyCharacters } from '../../api';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';
import classNames from 'classnames';



class CharList extends Component {
   
    state = {
        char: [],
        isLoading: true,
        isError: false,
        offset: 301,  // 1549 max offset
        isEnd: false
    }

    componentDidMount() {
        console.log("up")
        this.getCharacters();
    }

    getCharacters = async () => {
        this.setState({
            isLoading: true
        })

        try {
            const data = await  getManyCharacters(this.state.offset);
            if (data.length < 9) this.setState({isEnd: true})
            const char = [...this.state.char, ...data]
            this.setState({
                char,
                isLoading: false,
                offset: this.state.offset + 9
            })
        }
        catch {
            this.onError();
        }
    }

    onError = () => {
        this.setState({
            isLoading: false,
            isError: true
        }) 
    }

    

   

    render() {
        console.log("re")
        const {char, isError, isLoading, isEnd} = this.state;
        const charList = char.map((char, i) => <CharItem char={char} key={i}/>);
        const spinner = isLoading ? <Spinner/> : null;
        const error = isError ? <Error/> : null;
        const content = !(isError) ? charList : null;

        const btnClass = classNames({
            "button button__main button__long": true,
            "disabled" : isLoading,
            "hide": isEnd
        })

        return (
            <div className="char__list">
               
                <ul className="char__grid" onClick={this.props.onClickCharList}>
                    {content}
                </ul>
                {spinner}
                {error}
                <button onClick={this.getCharacters} className={btnClass} disabled={isLoading ? true : null}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

const CharItem = ({char}) => {
    const imageNA1 = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    const imageNA2 = "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif";
    let objectFit = null;
    if (char.thumbnail == imageNA1 || char.thumbnail == imageNA2) {
        objectFit = {objectFit: 'contain'}
    }

    return (
        <li className="char__item" data-id={char.id}>
            <img src={char.thumbnail} alt="abyss" style={objectFit}/>
            <div className="char__name">{char.name}</div>
        </li>   
    )
}

export default CharList;