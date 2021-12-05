import { Component } from 'react';
import { getManyCharacters } from '../../api';
import CharItem from '../charItem/CharItem';
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
        const {selectCharHandler} = this.props;
        const {char, isError, isLoading, isEnd} = this.state;
        
        const charList = char.map((char, i) => <CharItem selectCharHandler={selectCharHandler} char={char} key={char.id}/>);
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
               
                <ul className="char__grid">
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

export default CharList;