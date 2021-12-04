import { Component } from 'react';
import { getCharacter } from '../../api';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';


class CharInfo extends Component {
    state = {
        char: null,
        isLoading: false,
        isError: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setActiveChar();
        }
      
    }

    setActiveChar = async () => {
        try {
            this.setState({
                isLoading: true
            })
            const char = await getCharacter(this.props.activeChar);
    
            this.setState({
                char,
                isLoading: false
            })
        }
        catch {
            this.onError();
        }
     
    }

    onError = () => {
        this.setState({
            isError: true
        })
    }

    render() {
        let {char, isLoading, isError} = this.state;
        
        const spinner =  isLoading ? <Spinner/> : null;
        const error = isError ? <Error/> : null;
        const content =  !(isLoading || isError || !char) ? <Content char={char}/> : null;
        const skeleton = !(char || isLoading || isError) ? <Skeleton/> : null;
      

        return (
            <div className="char__info">
                {content}
                {skeleton}
                {spinner}
                {error}
            </div>
        )
    }
    
}

const Content = ({char}) => {
    let {name, description, thumbnail, comics} = char;
    let comicsList;
    description = description == "" ? "Description not Available": description;

    if (comics && comics.length == 0) {
        comicsList = "No comics for this character";
    } else if (comics) {
        comicsList = comics.map((item,i) => {return (
            <li className="char__comics-item" key={i}>
               {item}
            </li>
        )})
    }

    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} alt="abyss"/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href="#" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href="#" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comicsList}
        </ul>    
      </> 
    )
}

export default CharInfo;